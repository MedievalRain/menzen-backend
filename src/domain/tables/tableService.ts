import { parseDeleteTableInput, parseNewTableInput, parseRenameTableInput } from "./tableValidation";
import { TableRepository } from "./tableRepository";

class TableService {
  constructor(private tableRepository: TableRepository) {}

  public async createTable(data: unknown, userId: string) {
    const { name } = parseNewTableInput(data);
    await this.tableRepository.createTable(name, userId);
  }

  public async renameTable(data: unknown, userId: string) {
    const { name, id: tableId } = parseRenameTableInput(data);
    await this.tableRepository.renameTable(name, tableId, userId);
  }

  public async deleteTable(data: unknown, userId: string) {
    const { id: tableId } = parseDeleteTableInput(data);
    await this.tableRepository.deleteTable(tableId, userId);
  }

  public async getTables(userId: string) {
    return this.tableRepository.getTables(userId);
  }
}

export const tableService = new TableService(new TableRepository());
