import { formSchema } from '@/app/wizardForm/page';
import { NextResponse } from 'next/server';

export async function POST(request) {
	const body = await request.json();

	const result = formSchema.safeParse(body);
	let zodErrors = {};

	if (!result.success) {
		// result.error.issues.forEach((issue) => {
		//     zodErrors = {...zodErrors, [issue.path[0]]: issue.message}
		// })
		zodErrors = { errors: 'server error' };
	}

	return NextResponse.json(
		Object.keys.length > 0 ? { errors: zodErrors } : { success: true }
	);
}
