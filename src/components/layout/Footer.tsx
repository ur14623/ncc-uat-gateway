export const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="px-6 py-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} NCC UAT Portal • Chef Management System • All Rights Reserved
        </p>
      </div>
    </footer>
  );
};
