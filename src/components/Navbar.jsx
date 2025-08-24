import { AppBar, Toolbar, Typography, Container } from "@mui/material";

export default function Navbar() {
    return (
        <AppBar position="static" sx={{ background: "linear-gradient(90deg, #1e3c72, #2a5298)" }}>
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        🚀 Crypto Tracker
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
