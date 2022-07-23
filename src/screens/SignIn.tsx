import { useState } from "react";
import auth from "@react-native-firebase/auth"

import { Alert } from "react-native";

import { VStack, Heading, Icon, useTheme } from "native-base";

import { Envelope, Key } from "phosphor-react-native"

import Logo from "../assets/logo_primary.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false)

    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")

    const { colors } = useTheme()

    function handleSignIn() {
        if (!mail || !pass) {
            return Alert.alert("Entrar", "Informe e-mail e senha.")
        }

        setIsLoading(true)

        auth()
            .signInWithEmailAndPassword(mail, pass)
            .catch((err) => {
                console.log(err)
                setIsLoading(false)

                if (err.code == "auth/invalid-email") {
                    return Alert.alert("Entrar", "E-mail inválido.")
                }

                if (err.code == "auth/wrong-password") {
                    return Alert.alert("Entrar", "E-mail ou senha inválida.")
                }

                if (err.code == "auth/user-not-found") {
                    return Alert.alert("Entrar", "E-mail ou senha inválida.")
                }

                return Alert.alert("Entrar", "Não foi possível acessar.")
            })
    }

    return (
        <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />

            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input
                placeholder="E-mail"
                mb={4}
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />}
                onChangeText={setMail}
            />
            <Input
                placeholder="Senha"
                mb={8}
                InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
                onChangeText={setPass}
                secureTextEntry
            />

            <Button
                title="Entrar"
                w="full"
                onPress={handleSignIn}
                isLoading={isLoading}
            />
        </VStack>
    );
}