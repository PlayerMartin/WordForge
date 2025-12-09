import { SignUpForm } from '@/modules/auth/components/sign-up-form';
import { AuthPageTemplate } from '@/modules/auth/components/auth-page-template';

const SignUpPage = () => (
	<AuthPageTemplate
		title="Create account"
		subtitle="Join WordForge and start playing"
		footerText="Already have an account?"
		footerLinkText="Sign in"
		footerLinkHref="/auth/sign-in"
	>
		<SignUpForm />
	</AuthPageTemplate>
);

export default SignUpPage;
