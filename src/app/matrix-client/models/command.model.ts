export abstract class Command {

  abstract execute(matrixClient: any): Promise<any>;

}
