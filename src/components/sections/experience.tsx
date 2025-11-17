import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Smile, Leaf, Users } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      icon: Home,
      title: "Interior Hangat & Simpel",
      description: "Ruang kami dirancang untuk ketenangan, memadukan tekstur alami dengan garis-garis bersih.",
    },
    {
      icon: Smile,
      title: "Pelayanan Ramah",
      description: "Rasakan layanan yang sehangat dan se-mengundang minuman buatan tangan kami.",
    },
    {
      icon: Leaf,
      title: "Rasa yang Konsisten",
      description: "Setiap tegukan sama sempurnanya dengan yang terakhir, berkat filosofi kualitas kami.",
    },
    {
      icon: Users,
      title: "Suasana Komunitas",
      description: "Lebih dari sekadar kafe, kami adalah tempat berkumpul untuk teman dan para kreatif.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-4xl md:text-5xl font-headline font-bold text-center text-secondary-foreground">Pengalaman di Kopimi</h2>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-background border-none shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg">
              <CardHeader className="items-center text-center pt-8">
                <div className="p-3 bg-secondary rounded-full mb-4">
                  <exp.icon className="w-8 h-8 text-secondary-foreground" />
                </div>
                <CardTitle className="font-headline text-xl">{exp.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
