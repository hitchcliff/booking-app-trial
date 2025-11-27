import AuthRepository from "../repository/auth_repository";

export default function getUserId(): string | undefined {
  const authRepository = new AuthRepository();

  return authRepository.auth.currentUser?.uid;
}
