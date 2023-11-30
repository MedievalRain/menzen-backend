import { ColumnRepository } from "./ColumnRepository";
import {
  parseChangeColumnStatusInput,
  parseDeleteColumnInput,
  parseGetColumnsInput,
  parseNewColumnInput,
  parseRenameColumnInput,
} from "./columnValidation";

class ColumnService {
  constructor(private columnRepository: ColumnRepository) {}
  public async createColumn(data: unknown, userId: string) {
    const { id: collectionId, name } = parseNewColumnInput(data);
    await this.columnRepository.createColumn(name, collectionId, userId);
  }

  public async getColumns(data: unknown, userId: string) {
    const { id: collectionId } = parseGetColumnsInput(data);
    return this.columnRepository.getColumns(collectionId, userId);
  }

  public async deleteColumn(data: unknown, userId: string) {
    const { columnId, collectionId } = parseDeleteColumnInput(data);
    return this.columnRepository.deleteColumn(columnId, collectionId, userId);
  }

  public async renameColumn(data: unknown, userId: string) {
    const { name, columnId, collectionId } = parseRenameColumnInput(data);
    return this.columnRepository.renameColumn(name, columnId, collectionId, userId);
  }
  public async changeColumnStatus(data: unknown, userId: string) {
    const { enabled, columnId, collectionId } = parseChangeColumnStatusInput(data);
    return this.columnRepository.changeColumnStatus(enabled, columnId, collectionId, userId);
  }
}

export const columnService = new ColumnService(new ColumnRepository());
