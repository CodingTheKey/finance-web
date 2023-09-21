import { Icons } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { api } from '@/lib/axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'O nome não pode estar vazio.' })
      .refine((value) => value.trim() !== '', {
        message: 'O nome não pode consistir apenas em espaços em branco.',
      }),
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z
      .string()
      .min(4, { message: 'O senha precisa ter pelo menos 4 caracteres' }),
    confirmPassword: z
      .string()
      .min(4, { message: 'O senha precisa ter pelo menos 4 caracteres' }),
  })
  .refine((data) => data.name)
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas precisam ser iguais!',
    path: ['confirmPassword'],
  })

type RegisterFormData = z.infer<typeof registerFormSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  async function handleRegister(data: RegisterFormData) {
    try {
      // await api.post('/user', {
      //   name: data.name,
      //   email: data.email,
      //   password: data.password,
      //   confirmPassword: data.confirmPassword,
      // })

      // await router.push('/')
      console.log(data)
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        toast.error(err?.response?.data?.message)
        return
      }

      console.error(err)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(handleRegister)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="py-2" htmlFor="email">
              Nome de usuário
            </Label>
            <Input
              id="name"
              placeholder="joãozinho"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-sm mt-1 text-red-500">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="py-2" htmlFor="email">
              E-mail
            </Label>
            <Input
              id="email"
              placeholder="joãozinho@email.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isSubmitting}
              {...register('email')}
            />

            {errors.email && (
              <p className="text-sm mt-1 text-red-500">
                {errors.email?.message}
              </p>
            )}
          </div>

          <div className="grid gap-1">
            <Label className="py-2" htmlFor="password">
              Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="sua senha"
                type={showPassword ? 'text' : 'password'}
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isSubmitting}
                {...register('password')}
              />

              {errors.password && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.password?.message}
                </p>
              )}

              {showPassword ? (
                <Icons.eye
                  color="#0f172a"
                  onClick={togglePasswordVisibility}
                  className="mr-2 h-4 w-4 absolute top-3 right-1 cursor-pointer"
                />
              ) : (
                <Icons.eye_closed
                  color="#0f172a"
                  onClick={togglePasswordVisibility}
                  className="mr-2 h-4 w-4 absolute top-3 right-1 cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="grid gap-1">
            <Label className="py-2" htmlFor="confirm-password">
              Confirmar senha
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                placeholder="confirme a sua senha"
                type={showConfirmPassword ? 'text' : 'password'}
                autoCapitalize="none"
                autoCorrect="off"
                disabled={isSubmitting}
                {...register('confirmPassword')}
              />

              {errors.confirmPassword && (
                <p className="text-sm mt-1 text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}

              {showConfirmPassword ? (
                <Icons.eye
                  color="#0f172a"
                  onClick={toggleConfirmPasswordVisibility}
                  className="mr-2 h-4 w-4 absolute top-3 right-1 cursor-pointer"
                />
              ) : (
                <Icons.eye_closed
                  color="#0f172a"
                  onClick={toggleConfirmPasswordVisibility}
                  className="mr-2 h-4 w-4 absolute top-3 right-1 cursor-pointer"
                />
              )}
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin " />
            )}
            Criar conta
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            ou continue com
          </span>
        </div>
      </div>
      <Button
        type="button"
        disabled={isSubmitting}
        onClick={() => signIn('google')}
        className="text-white bg-red-600 hover:bg-red-600/90 focus:ring-4 focus:bg-red-600/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#dc2626]/55 mr-2 mb-2"
      >
        <Icons.google className="mr-2 h-4 w-4" color="bg-red-700" />
        Google
      </Button>
    </div>
  )
}
