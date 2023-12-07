export type ApiErrorTypes =
  | "JWT"
  | "WRONG_PASSWORD"
  | "VALIDATION_ERROR"
  | "USER_EXISTS"
  | "USER_NOT_EXIST"
  | "USER_NOT_ACTIVE"
  | "USER_VERIFIED"
  | "USER_NOT_VERIFIED"
  | "INVALID_JWT"
  | "COLLECTION_NOT_EXISTS"
  | "COLUMN_EXISTS"
  | "COLUMN_NOT_EXIST"
  | "ORDERING_ERROR"
  | "COIN_NOT_EXISTS"
  | "NO_FILE"
  | "IMAGE_NOT_EXISTS";

export class ApiError extends Error {
  status: number;
  type: ApiErrorTypes;

  constructor(status: number, type: ApiErrorTypes) {
    super();
    this.status = status;
    this.type = type;
  }

  static UserExists() {
    return new ApiError(409, "USER_EXISTS");
  }

  static UserNotExist() {
    return new ApiError(404, "USER_NOT_EXIST");
  }
  static Validation() {
    return new ApiError(400, "VALIDATION_ERROR");
  }
  static WrongPassword() {
    return new ApiError(401, "WRONG_PASSWORD");
  }

  static InvalidJWT() {
    return new ApiError(401, "INVALID_JWT");
  }

  static CoinNotExist() {
    return new ApiError(404, "COIN_NOT_EXISTS");
  }

  static CollectionNotExist() {
    return new ApiError(401, "COLLECTION_NOT_EXISTS");
  }
  static ColumnExists() {
    return new ApiError(409, "COLUMN_EXISTS");
  }

  static ColumnNotExist() {
    return new ApiError(404, "COLUMN_NOT_EXIST");
  }

  static ImageNotExist() {
    return new ApiError(404, "IMAGE_NOT_EXISTS");
  }

  static NoFile() {
    return new ApiError(400, "NO_FILE");
  }

  static Ordering() {
    return new ApiError(400, "ORDERING_ERROR");
  }

  static UserNotVerified() {
    return new ApiError(403, "USER_NOT_VERIFIED");
  }

  static UserVerified() {
    return new ApiError(409, "USER_VERIFIED");
  }
}
