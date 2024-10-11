import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  // si existe una sesión mostramos el nombre de usuario, sino lo seteamos como anon
  if (req.session.user) {
    res.render("index", {
      style: "output.css",
      user: req.session.user,
      isAdmin: req.session.user.role === "admin",
      title: "mulmeyun | Official Website",
    });
  } else {
    res.render("index", {
      style: "output.css",
      user: { first_name: "anon" },
      title: "mulmeyun | Official Website",
    });
  }
});

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login | mulmeyun | Official Website",
    style: "output.css",
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register | mulmeyun | Official Website",
    style: "output.css",
  });
});

router.get("/restorePassword", (req, res) => {
  const token = req.query.token; // Access the token from query parameters

  if (token) {
    res.render("restorePasswordForm", {
      title: "Restore Password | mulmeyun | Official Website",
      style: "output.css",
      token, // Pass the token to the template
    });
  } else {
    res.render("restorePasswordButton", {
      title: "Restore Password | mulmeyun | Official Website",
      style: "output.css",
    });
  }
});

router.get("/restorePasswordThanks", (req, res) => {
  res.render("restorePasswordThanks", {
    title: "Restore Password | mulmeyun | Official Website",
    style: "output.css",
  });
});

export default router;
