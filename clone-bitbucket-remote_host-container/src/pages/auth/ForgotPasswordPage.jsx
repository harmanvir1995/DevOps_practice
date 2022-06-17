import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context as AuthContext } from "../../context/AuthContext";
import { REGEX } from "../../helpers/constants";

/**
 * displays a form with an email field 
 * that will be used for the password reset
 * @returns the forgot-password page
 */
const ForgotPasswordPage = () => {
  const { state: authState, forgotPassword } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    forgotPassword(data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="6">
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email address</FormLabel>
          <Input
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
        <Button
          data-testid="submit-button"
          type="submit"
          colorScheme="pink"
          size="lg"
          fontSize="md"
          alignSelf="stretch"
        >
          Envoyer à nouveau
        </Button>
        {authState.errorMessage && (
          <Text color="red.400" fontWeight="bold" textAlign="center">
            {authState.errorMessage}
          </Text>
        )}
        {authState.successMessage && (
          <Text color="green.400" fontWeight="bold" textAlign="center">
            {authState.successMessage}
          </Text>
        )}
      </Stack>
    </form>
  );
};

export default ForgotPasswordPage;
