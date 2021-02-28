<template>
  <div class="flex justify-between">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>
    <button @click="close" class="text-4xl text-gray-600 focus:outline-none">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          type="email"
          placeholder="email@example.com"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{
            'border-brand-danger': !!state.email.errorMessage,
          }"
          v-model="state.email.value"
        />
        <span
          class="block font-medium text-brand-danger"
          v-if="!!state.email.errorMessage"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>
      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          type="password"
          placeholder="Digite a sua senha"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          :class="{
            'border-brand-danger': !!state.password.errorMessage,
          }"
          v-model="state.password.value"
        />
        <span
          class="block font-medium text-brand-danger"
          v-if="!!state.password.errorMessage"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        :disabled="state.isLoading"
        type="submit"
        :class="{
          'opacity-50': state.isLoading,
        }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        <icon v-if="state.isLoading" name="loading" class="animate-spin" />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import useModal from "../../hooks/useModal";
import { useField } from "vee-validate";
import {
  validateEmptyAndEmail,
  validateEmptyAndLength3,
} from "../../utils/validators";
import services from "../../services";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import Icon from "../Icon";

export default {
  components: { Icon },
  setup() {
    const modal = useModal();
    const router = useRouter();
    const toast = useToast();
    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      "email",
      validateEmptyAndEmail
    );
    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage,
    } = useField("password", validateEmptyAndLength3);
    const state = reactive({
      hasError: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage,
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage,
      },
    });
    async function handleSubmit() {
      try {
        toast.clear();
        state.isLoading = true;
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value,
        });

        if (!errors) {
          window.localStorage.setItem("token", data.token);
          router.push({ name: "Feedbacks" });
          state.isLoading = false;
          modal.close();
          return;
        }

        if (errors.status === 404) {
          toast.error("E-mail não econtrado.");
        }

        if (errors.status === 401) {
          toast.error("Email/senha inválidos.");
        }

        if (errors.status === 400) {
          toast.error("Ocorreu um erro ao fazer login.");
        }

        state.isLoading = false;
      } catch (error) {
        state.isLoading = false;
        state.hasError = !!error;
        toast.error("Ocorreu um erro ao fazer login.");
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
    };
  },
};
</script>
