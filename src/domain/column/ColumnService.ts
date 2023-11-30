import { ColumnRepository } from "./ColumnRepository";
import { parseDeleteColumnInput, parseGetColumnsInput, parseNewColumnInput, parseRenameColumnInput } from "./columnValidation";

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

  public async deleteColumn(data: unknown, userId: string) {
    const { columnId, tableId } = parseDeleteColumnInput(data);
    return this.columnRepository.deleteColumn(columnId, tableId, userId);
  }

  public async renameColumn(data: unknown, userId: string) {
    const { name, columnId, tableId } = parseRenameColumnInput(data);
    return this.columnRepository.renameColumn(name, columnId, tableId, userId);
  }
}

export const columnService = new ColumnService(new ColumnRepository());
