import { generatePasswordHash } from "./passwordUtils";
import { sendVerificationEmail } from "./emailUtils";
import { UserRepository } from "./userRepository";
import { parseAuthInput, parseUserId } from "./userValidation";

class UserService {
  constructor(private userRepository: UserRepository) {}

  public async createUser(data: unknown) {
    const { email, password } = parseAuthInput(data);
    const passwordHash = await generatePasswordHash(password);
    const userId = await this.userRepository.createUser(email, passwordHash);
    await sendVerificationEmail(userId, email);
  }

  public async verifyEmail(data: unknown) {
    const { id } = parseUserId(data);
    await this.userRepository.verifyEmail(id);
  }
}

export const userService = new UserService(new UserRepository());
