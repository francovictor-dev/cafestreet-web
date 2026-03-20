"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInClient } from "@/api/auth.api";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { IconButton } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/api/use-auth";
import successAnimation from "@/public/lotties/success-animation.json";
import { LoginFormData, loginSchema } from "@/schemas/login.schema";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Activity, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AuthPage() {
  const Router = useRouter();
  const { mutateAsync } = useLogin(signInClient);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const goToLandingPage = () => {
    Router.replace("/");
    Router.refresh();
  };

  const signInCompleted = () => {
    Router.replace("/client/dashboard/home");
  };

  const onSubmit = async ({ email, password }: LoginFormData) => {
    setIsLoading(true);

    try {
      await mutateAsync({ email, password });

      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 2000);
    } catch (e) {
      console.error("login failed:", e);
      toast.error("Usuário não permitido");
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen w-full flex items-center justify-center ">
      <motion.div
        className="p-8 bg-primary-200"
        animate={
          !isLoading && !isSuccess
            ? {
                width: 350,
                height: 370,
                borderRadius: 32,
                opacity: 1,
              }
            : {
                borderRadius: 999,
                width: 50,
                height: 50,
                opacity: 0,
              }
        }
        transition={{
          duration: 0.8,
        }}
      >
        <motion.div
          className=" flex flex-col"
          animate={isLoading ? { opacity: 0 } : { opacity: 1 }}
          transition={{ delay: isLoading ? 0 : 0.8 }}
        >
          <IconButton
            size={"sm"}
            className="absolute ml-[-8] mt-[-16] p-1 flex flex-row items-center justify-end"
            onClick={goToLandingPage}
          >
            <ArrowLeft size={24} />
          </IconButton>

          <label className="heading-md text-center mb-4">Login</label>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">E-mail</FieldLabel>
                  <Input
                    id="email"
                    type="text"
                    //onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@gmail.com"
                    error={errors.email}
                    {...register("email")}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    //onChange={(e) => setPassword(e.target.value)}
                    placeholder="Senha123"
                    error={errors.password}
                    {...register("password")}
                  />
                </Field>
                <Button disabled={isSubmitting}>Entrar</Button>
                <p className="body-md text-center text-bw-500">
                  Não tem conta? Faça seu registro{" "}
                  <span
                    onClick={() => alert(11)}
                    className="underline cursor-pointer"
                  >
                    aqui
                  </span>
                </p>
              </FieldGroup>
            </FieldSet>
          </form>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="sync">
        {isLoading && (
          <motion.div
            className="absolute"
            key={2}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              key={1}
              className="bg-primary-400 rounded-full"
              animate={{
                opacity: [0, 1, 0],
                width: [50, 100, 150],
                height: [50, 100, 150],
              }}
              exit={{ opacity: 0 }}
              transition={{
                ease: "linear",
                duration: 3,
                repeat: Infinity,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            className="absolute"
            key={2}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-primary-400 rounded-full"
              animate={{
                opacity: [0, 1, 0],
                width: [50, 100, 150],
                height: [50, 100, 150],
              }}
              transition={{
                ease: "linear",
                duration: 3,
                repeat: Infinity,
                delay: 1.5,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Activity mode={isSuccess ? "visible" : "hidden"}>
        <Lottie
          animationData={successAnimation}
          onComplete={signInCompleted}
          loop={false}
          autoPlay
          style={{
            width: 200,
            height: 200,
            marginLeft: -55,
          }}
        />
      </Activity>
    </main>
  );
}
