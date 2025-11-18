// ============================================
// USER ACTIONS - Server actions pre používateľov
// ============================================
//
// "use server" directive na vrchu súboru!
//
// Sem patria server actions pre používateľské účty:
//
// 1. updateUserProfile(data)
//    - Update username, avatar
//    - Validácia (Zod schema)
//    - Check uniqueness username
//    - Return: ApiResponse<UserProfile>
//
// 2. getUserProfile(userId)
//    - Získa verejný profil používateľa
//    - Return: ApiResponse<PublicUserProfile>
//
// 3. getUserStats(userId)
//    - Získa štatistiky pre všetky jazyky
//    - Return: ApiResponse<UserLanguageStats[]>
//
// 4. getUserGameHistory(userId, pagination)
//    - Získa históriu hier s paginationom
//    - Return: ApiResponse<PaginatedResponse<Game>>
//
// 5. createUser(data)
//    - Vytvorenie nového používateľa (pri registrácii)
//    - Hash hesla (bcrypt)
//    - Validácia
//    - Return: ApiResponse<User>
//
// Použitie:
// import { updateUserProfile } from '@/actions/userActions'
// const result = await updateUserProfile({ username: 'newname' })
//
// Implementácia:
// 'use server'
//
// import { prisma } from '@/lib/prisma'
// import { getCurrentUser } from '@/lib/auth/getSession'
// import { profileUpdateSchema } from '@/lib/utils/validators'
//
// export async function updateUserProfile(data: UpdateProfileData) {
//   const user = await getCurrentUser()
//   if (!user) return { success: false, error: 'Not authenticated' }
//
//   const validated = profileUpdateSchema.safeParse(data)
//   if (!validated.success) return { success: false, error: 'Invalid data' }
//
//   // Update...
// }
