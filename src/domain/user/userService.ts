import { generatePasswordHash } from "./authUtils";
import { UserRepository } from "./userRepository";
import { parseAuthInput } from "./userValidation";

class UserService {
  constructor(private userRepository: UserRepository) {}

  public async createUser(data: unknown) {
    const { email, password } = parseAuthInput(data);
    const passwordHash = await generatePasswordHash(password);
    const userId = await this.userRepository.createUser(email, passwordHash);
  }
}

export const userService = new UserService(new UserRepository());
