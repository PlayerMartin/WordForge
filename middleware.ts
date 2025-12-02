import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
	function middleware(req: NextRequest) {
		return NextResponse.next();
	},
	{
		pages: {
			signIn: "/auth/signin",
		},
	}
);

export const config = {
	matcher: ["/((?!$|auth/).*)"], // all paths except "/" and "auth/*"
};
