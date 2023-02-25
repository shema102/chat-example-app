import {object, string, InferType} from 'yup';

const authSchema = object({
  email: string().required('Email is required').email('Email invalid'),
  password: string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const validateAuth = async (
  data: InferType<typeof authSchema>,
): Promise<{valid: boolean; errors: Array<string>}> => {
  try {
    const result = await authSchema.validate(data, {abortEarly: false});

    return {valid: !!result, errors: []};
  } catch (e) {
    if (!e?.errors) {
      return {valid: false, errors: ['Unknown error']};
    }

    return {valid: false, errors: e.errors};
  }
};
