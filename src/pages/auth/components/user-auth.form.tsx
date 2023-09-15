import { Icons } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { SyntheticEvent, useState } from 'react'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="py-2" htmlFor="email">
              E-mail
            </Label>
            <Input
              id="email"
              placeholder="seu-email@email.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
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
                disabled={isLoading}
              />

              {showPassword ? (
                <Icons.eye
                  color="#ffff"
                  onClick={togglePasswordVisibility}
                  className="mr-2 h-4 w-4 absolute top-3 right-1 cursor-pointer"
                />
              ) : (
                <Icons.eye_closed
                  color="#ffff"
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
                disabled={isLoading}
              />

              {showConfirmPassword ? (
                <Icons.eye
                  color="#ffff"
                  onClick={toggleConfirmPasswordVisibility}
                  className="mr-2 h-4 w-4 absolute top-3 right-1 cursor-pointer"
                />
              ) : (
                <Icons.eye_closed
                  color="#ffff"
                  onClick={toggleConfirmPasswordVisibility}
                  className="mr-2 h-4 w-4 absolute top-3 right-1 cursor-pointer"
                />
              )}
            </div>
          </div>
          <Button className="mt-2" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
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
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
    </div>
  )
}
