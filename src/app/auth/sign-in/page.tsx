import { SignInForm } from '@/modules/auth/components/sign-in-form';
import { OAuthSection } from '@/modules/auth/components/oauth-section';
import { AuthPageTemplate } from '@/modules/auth/components/auth-page-template';

const SignInPage = () => (
	<AuthPageTemplate
		title="Welcome back"
		subtitle="Sign in to continue playing WordForge"
		footerText="Don't have an account?"
		footerLinkText="Sign up"
		footerLinkHref="/auth/sign-up"
	>
		<SignInForm />
		<OAuthSection />
	</AuthPageTemplate>
);

export default SignInPage;
