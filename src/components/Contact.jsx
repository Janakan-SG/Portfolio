import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Globe, Loader2 } from "lucide-react";

export function Contact() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (values.name.length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!values.email.includes("@")) newErrors.email = "Please enter a valid email";
    if (values.message.length < 10) newErrors.message = "Message must be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Server error");
      setSuccess(true);
      setValues({ name: "", email: "", message: "" });
      setErrors({});
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setPending(false);
    }
  };

  const contactInfo = [
    { icon: Mail,   label: "Email",        value: "sritharanjanakan2003@gmail.com" },
    { icon: MapPin, label: "Location",     value: "SriLanka"                     },
    { icon: Globe,  label: "Availability", value: "Open to Remote Work"           },
  ];

  return (
    <section id="contact" className="py-24 relative bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16" >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Let's Connect</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8" >
            <div>
              <h3 className="text-2xl font-bold mb-2">Got a project in mind?</h3>
              <p className="text-muted-foreground">
                I'm open to full-time roles, freelance projects, and exciting collaborations. Drop me a message — I read every one and respond fast.
              </p>
            </div>
            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{label}</p>
                    <p className="text-foreground font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border p-8 rounded-2xl shadow-lg">
            {success && (
              <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-medium">
                Message sent! Thanks for reaching out. I'll get back to you soon.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Name
                </label>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Message
                </label>
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
                {errors.message && (
                  <p className="text-xs text-destructive mt-1">{errors.message}</p>
                )}
              </div>
              {errors.submit && (
                <p className="text-xs text-destructive">{errors.submit}</p>
              )}
              <button
                type="submit"
                disabled={pending}
                className="w-full h-10 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/80 transition-colors flex items-center justify-center gap-2">
                {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}