"use client";

import { Stack, Box, Container, Link, useTheme } from "@mui/material";
import { LangSwitch } from "@pagopa/mui-italia";




export const Footer= () => {
	const theme = useTheme();
	return  (
		<Box component="footer">
			<Box
				sx={{
					borderTop: 1,
					borderColor: "divider",
					backgroundColor: "background.paper",
				}}
			>
				<Container maxWidth={false} sx={{ py: { xs: 3, md: 2 } }}>
					<Stack
						spacing={{ xs: 4, md: 3 }}
						direction={{ xs: "column", md: "row" }}
						justifyContent="space-between"
						sx={{ alignItems: "center" }}
					>
						

						<Stack
							spacing={{ xs: 1, md: 3 }}
							direction={{ xs: "column", md: "row" }}
							sx={{ alignItems: "center" }}
						>
							{/* {links.map(({ href = hrefNoOp, label, ariaLabel, onClick }, i) => (
								<Link
									aria-label={ariaLabel}
									href={href}
									onClick={wrapHandleExitAction(href, onClick, onExit)}
									key={i}
									underline="none"
									color="text.primary"
									sx={{ display: "inline-block" }}
									variant="subtitle2"
								>
									{label}
								</Link>
							))}

							<LangSwitch {...langProps} /> */}
						</Stack>
					</Stack>
				</Container>
			</Box>
		</Box>
	);
};