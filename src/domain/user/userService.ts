import { generatePasswordHash } from "./authUtils";
import { sendVerificationEmail } from "./emailUtils";
import { UserRepository } from "./userRepository";
import { parseAuthInput } from "./userValidation";

class UserService {
  constructor(private userRepository: UserRepository) {}

  public async createUser(data: unknown) {
    const { email, password } = parseAuthInput(data);
    const passwordHash = await generatePasswordHash(password);
    const userId = await this.userRepository.createUser(email, passwordHash);
    await sendVerificationEmail(userId, email);
  }
}

export const userService = new UserService(new UserRepository());
