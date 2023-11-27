import { generatePasswordHash, validatePassword } from "./passwordUtils";
import { sendVerificationEmail } from "./emailUtils";
import { UserRepository } from "./userRepository";
import { parseAuthInput, parseUserId } from "./userValidation";
import { WrongPasswordError } from "../../errors/WrongPasswordError";
import { generateJWT } from "../../utils/jwt";

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

  public async login(data: unknown) {
    const { email, password } = parseAuthInput(data);
    const { id, passwordHash } = await this.userRepository.getUserCredentials(email);
    const isPasswordValid = await validatePassword(password, passwordHash);
    if (isPasswordValid) {
      return generateJWT(id);
    } else {
      throw new WrongPasswordError();
    }
  }
}

export const userService = new UserService(new UserRepository());
