import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { InputField, Button } from '../components/htmlElements/';
import { FormHeader } from '../components/utils/FormHeader';
import { Wrapper } from '../components/Wrapper';
import { useLoginMutation, MeQuery, MeDocument } from '../generated/graphql';
import { toErrorMap } from '../utils/helpers/toErrorMap';
import withApollo from '../utils/apollo/withApollo';
import NextLink from 'next/link';

interface registerProps {}

const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  return (
    <Wrapper navbar>
      <FormHeader text='Sign in to your account' />

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white dark:bg-dark py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <Formik
            initialValues={{
              usernameOrEmail: '',
              password: '',
            }}
            onSubmit={async (values, { setErrors }) => {
              const response = await login({
                variables: values,
                // refetchQueries: [MeDocument]
                update: (cache, { data }) => {
                  cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                      __typename: 'Query',
                      me: data?.login.user,
                    },
                  });
                },
              });
              if (response.data?.login.errors) {
                setErrors(toErrorMap(response.data.login.errors));
              } else if (response.data?.login.user) {
                router.push('/');
              }
            }}
          >
            {({ values, handleChange, isSubmitting }) => (
              <Form className='space-y-4'>
                <InputField
                  name='usernameOrEmail'
                  placeholder='username or email'
                  label='Username or Email'
                  autoComplete='on'
                />
                <InputField
                  name='password'
                  placeholder='password'
                  label='Password'
                  type='password'
                  autoComplete='on'
                />

                <div className='text-sm'>
                  <NextLink href='/forgot-password'>
                    <a className='font-medium text-purple hover:text-purple-dark'>
                      Forgot your password?
                    </a>
                  </NextLink>
                </div>

                <Button loading={isSubmitting} text='login' type='submit' />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(Login);
