import { parseNewTableInput, parseRenameTableInput } from "./tableValidation";
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
}

export const tableService = new TableService(new TableRepository());
