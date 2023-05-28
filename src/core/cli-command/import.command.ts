import TsvFileReader from '../file-reader/tsv-file-reader.js';
import { createOffer } from '../../common/offers.js';
import { getErrorMessage } from '../../common/utils.js';
import { UserServiceInterface } from '../../modules/user/user-service.interface.js';
import { RentalServiceInterface } from '../../modules/rental/rental-service.interface.js';
import { DatabaseClientInterface } from '../databese-client/database-client.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import PinoService from '../logger/pino.service.js';
import UserService from '../../modules/user/user-service.js';
import { UserModel } from '../../modules/user/user.entity.js';
import RentalService from '../../modules/rental/rental-service.js';
import { RentalModel } from '../../modules/rental/rental.entity.js';
import MongoClientService from '../databese-client/mongo-client.service.js';
import { RentalOffer } from '../../types/rental-offer.js';
import { createUser } from '../../common/user.js';
import { getUri } from '../../common/db.js';
import { ConfigInterface } from '../config/config.interface.js';
import { RestSchema } from '../config/rest.schema.js';
import ConfigService from '../config/config.service.js';

export default class ImportCommand {
  public readonly name = '--import';
  private readonly logger!: LoggerInterface;
  private userService!: UserServiceInterface;
  private rentalService!: RentalServiceInterface;
  private databaseClient!: DatabaseClientInterface;
  private configService!: ConfigInterface<RestSchema>
  private salt!: string;

  constructor() {
    this.oneLine = this.oneLine.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.logger = new PinoService;
    this.userService = new UserService(this.logger, UserModel);
    this.rentalService = new RentalService(this.logger, RentalModel);
    this.databaseClient = new MongoClientService(this.logger);
    this.configService = new ConfigService(this.logger);
  }

  private async saveRentalOffer(rentalOffer: RentalOffer) {
    const createdUser = createUser();
    const userFromDatabase = await this.userService.findOrCreate(createdUser, this.salt);

    await this.rentalService.create({
      ...rentalOffer,
      userId: userFromDatabase.id
    })
  }

  private async oneLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveRentalOffer(offer)
    resolve();
  }

  private async onComplete(count: number) {
    this.logger.info(`${count} rows imported`);
    await this.databaseClient.disconnect();
  }

  public async execute(pathToFile: string): Promise<void> {
    this.salt = this.configService.get('SALT');
    const uri = getUri(
      this.configService.get('DB_HOST'),
      this.configService.get('DB_USER'),
      this.configService.get('DB_PASSWORD'),
      this.configService.get('DB_PORT'),
      this.configService.get('DB_NAME'),
    );

    await this.databaseClient.connect(uri);

    const fileReader = new TsvFileReader(pathToFile.trim());

    fileReader.on('line', this.oneLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (error) {
      console.log(`Can't read the file: ${getErrorMessage(error)}`);
    }
  }
}
