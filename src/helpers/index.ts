import crypto from 'crypto';

// Se deberia guardar en .env, pero por simplicidad se deja aquí
const SECRET : string = "bcea0ea6-c5e7-4220-b6dc-a42e34c0d24d"

/**
 * Genera un string aleatorio usando crypto.
 * 
 * @returns {string} Un string aleatorio en base64
 */
export const random = (): string => crypto.randomBytes(128).toString("base64");

/**
 * Encripta la contraseña usando un salt.
 * 
 * @param {string} salt El salt a usar
 * @param {string} password La contraseña a encriptar
 * @returns {string} La contraseña encriptada
 */
export const authentication = (salt: string, password: string): string => {
    return crypto.createHmac("sha256",[salt,password].join(":")).update(SECRET).digest("hex")
}
