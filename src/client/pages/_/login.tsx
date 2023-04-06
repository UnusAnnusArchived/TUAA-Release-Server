import { GetStaticProps, NextPage } from "next";

interface IProps {
  token?: string;
}

const Login: NextPage<IProps> = ({ token }) => {
  return <p>{token}</p>;
};

export default Login;

export const getStaticProps: GetStaticProps<IProps> = (context) => {
  const token =
    typeof context.params?.token === "string"
      ? context.params?.token ?? "undefined"
      : context.params?.token?.[0] ?? "undefined";

  return {
    props: {
      token: token,
    },
  };
};
