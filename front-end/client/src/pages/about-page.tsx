import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brain, BookOpen, ShieldCheck, MapPin, Phone, Mail } from "lucide-react";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Minhaj Noushad",
      role: "Tech Lead",
      bio: "Who once thought 'debugging' meant removing insects from his laptop. Still occasionally tries to fix code errors by restarting his computer.",
      imageUrl: `https://randomuser.me/api/portraits/men/42.jpg`
    },
    {
      name: "John Antony",
      role: "Tech Lead",
      bio: "Who debugged his entire project by adding 'console.log' statements everywhere and still doesn't know what caused the bug. Thinks 'version control' means having 10 copies of the same file.",
      imageUrl: `https://randomuser.me/api/portraits/men/43.jpg`
    },
    {
      name: "Alvi A V",
      role: "Tech Lead",
      bio: "Who spends more time creating memes about coding than actually coding. Once tried to use a 'while(sleeping)' loop to solve his insomnia.",
      imageUrl: `https://randomuser.me/api/portraits/men/32.jpg`
    }
  ];

  const approaches = [
    {
      icon: <Brain className="text-primary h-6 w-6" />,
      title: "AI-Powered Predictions",
      description: "Our proprietary machine learning algorithms analyze historical data, market trends, and news sentiment to generate accurate stock predictions."
    },
    {
      icon: <BookOpen className="text-primary h-6 w-6" />,
      title: "Education First",
      description: "We prioritize user understanding through comprehensive educational resources, interactive tutorials, and personalized learning paths."
    },
    {
      icon: <ShieldCheck className="text-primary h-6 w-6" />,
      title: "User-Centric Design",
      description: "Every feature is designed with user experience in mind, making complex financial information accessible and actionable."
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would handle contact form submission in a real implementation
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* About Hero Section */}
      <section className="bg-primary text-white py-20 pt-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Stockfolio</h1>
          <p className="text-xl max-w-3xl mx-auto">Empowering investors with education and AI-powered stock predictions since 2020.</p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
              <p className="text-muted-foreground mb-4">At Stockfolio, we believe that financial literacy and investment knowledge should be accessible to everyone, not just Wall Street professionals.</p>
              <p className="text-muted-foreground mb-4">Our mission is to democratize stock market investing by providing educational resources, advanced analytics, and AI-powered predictions that help investors of all experience levels make informed decisions. We primarily aim to empower low-income individuals with the knowledge and tools to build wealth through investing.</p>
              <p className="text-muted-foreground mb-4">We're committed to breaking down financial barriers that have historically excluded underserved communities from participating in wealth-building opportunities in the stock market.</p>
              <p className="text-muted-foreground">By focusing on financial education and accessible tools, we aim to create pathways for economic mobility and financial independence for those who need it most.</p>
            </div>
            <div className="flex justify-center">
              <svg className="w-full max-w-md" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="500" height="400" rx="12" fill="#27272a" />
                <circle cx="250" cy="200" r="100" fill="#3b3b45" />
                <path d="M200,220 C220,260 280,260 300,220" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
                <circle cx="220" cy="180" r="10" fill="#6366f1" />
                <circle cx="280" cy="180" r="10" fill="#6366f1" />
                <path d="M150,120 C200,80 300,80 350,120" stroke="#6366f1" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Meet Our Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-card rounded-xl shadow-md overflow-hidden border border-border">
                <div className="h-64 bg-muted">
                  {/* Here we'd use an actual image in production */}
                  <div className="h-full w-full flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground text-sm">Team Member Photo</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-foreground">{member.name}</h3>
                  <div className="bg-primary text-white px-3 py-1 rounded-md inline-block text-sm font-semibold mb-3">{member.role}</div>
                  <p className="text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Approach</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {approaches.map((approach, index) => (
              <div key={index} className="bg-background/80 rounded-xl p-6 shadow-md border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {approach.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{approach.title}</h3>
                <p className="text-muted-foreground">{approach.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-md overflow-hidden border border-border">
            <div className="md:flex">
              <div className="md:w-1/2 bg-primary text-white p-8">
                <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
                <p className="mb-6">We'd love to hear from you. Reach out with questions, feedback, or partnership opportunities.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="mr-3 h-5 w-5" />
                    <span>123 Financial District, New York, NY 10004</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-3 h-5 w-5" />
                    <span>contact@stockfolio.com</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-3 h-5 w-5" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-8">
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-4">
                    <label className="block text-foreground text-sm font-medium mb-2" htmlFor="name">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-foreground text-sm font-medium mb-2" htmlFor="email">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-foreground text-sm font-medium mb-2" htmlFor="message">
                      Message
                    </label>
                    <Textarea id="message" rows={4} placeholder="Your message" />
                  </div>
                  
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
