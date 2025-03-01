'use server'
// GET USER BY ID
export async function getUserById(id) {

    const user = await prisma.user.findUnique({
        where: { id }
    });
    return user

}


// GET USER BY EMAIL
export async function getUserByEmail(email) {

    const user = await prisma.user.findUnique({
        where: { email }
    });
    return user

}