import { ColumnRepository } from "./ColumnRepository";
import { parseGetColumnsInput, parseNewColumnInput } from "./columnValidation";

class ColumnService {
  constructor(private columnRepository: ColumnRepository) {}
  public async createColumn(data: unknown, userId: string) {
    const { id: tableId, name } = parseNewColumnInput(data);
    await this.columnRepository.createColumn(name, tableId, userId);
  }

  public async getColumns(data: unknown, userId: string) {
    const { id: tableId } = parseGetColumnsInput(data);
    return this.columnRepository.getColumns(tableId, userId);
  }
}

export const columnService = new ColumnService(new ColumnRepository());
