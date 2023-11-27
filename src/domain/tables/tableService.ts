import { parseNewTableInput } from "./tableValidation";
import { TableRepository } from "./tableRepository";

class TableService {
  constructor(private tableRepository: TableRepository) {}

  public async createTable(data: unknown, userId: string) {
    const { name } = parseNewTableInput(data);
    await this.tableRepository.createTable(name, userId);
  }
}

export const tableService = new TableService(new TableRepository());
