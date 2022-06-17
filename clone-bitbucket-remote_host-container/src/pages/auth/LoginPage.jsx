import { Button, Input, Stack, Text } from "@chakra-ui/react";
//CHAKRA
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
//COMPONENTS
import { PasswordField } from "../../components/PasswordField";
//FORM
import { useForm } from "react-hook-form";
//REACT
import { useContext } from "react";
//CONTEXT
import { Context as AuthContext } from "../../context/AuthContext";
//HELPERS
import { REGEX } from "../../helpers/constants";

/**
 * displays the login form with an email and a password fields, and a submit button
 * @returns the login page component
 */
const LoginPage = () => {
  const { state: authState, signin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signin(data);
  };

  
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="6">
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
            data-testid="email-input"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            {...register("email", {
              required: "Veuillez saisir une adresse email",
              pattern: {
                value: REGEX.VALID_EMAIL,
                message: "Entrez une adresse email valide",
              },
            })}
            />
            
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <PasswordField {...register("password", { required: true })} />
        <Button
          data-testid="login-button"
          type="submit"
          colorScheme="pink"
          size="lg"
          fontSize="md"
          alignSelf="flex-end"
        >
          Se connecter
        </Button>
        {authState.errorMessage && (
          <Text color="red.400" fontWeight="bold" textAlign="center">
            {authState.errorMessage}
          </Text>
        )}
      </Stack>
    </form>
  );
};

export default LoginPage;
