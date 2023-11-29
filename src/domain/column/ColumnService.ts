import { ColumnRepository } from "./ColumnRepository";
import { parseNewColumnInput } from "./columnValidation";

class ColumnService {
  constructor(private columnRepository: ColumnRepository) {}
  public async createColumn(data: unknown, userId: string) {
    const { id: tableId, name } = parseNewColumnInput(data);
    await this.columnRepository.createColumn(name, tableId, userId);
  }
}

export const columnService = new ColumnService(new ColumnRepository());
