// TODO: vlozit loading component na jine pages tak aby vsude fungovalo!
const LoadingComponent = () => (
	<div className="flex min-h-screen items-center justify-center">
		<div className="h-20 w-20 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
	</div>
);

export default LoadingComponent;
