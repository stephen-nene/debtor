import { PublicNavbar } from "@/components/public-navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-background to-muted/30 py-12 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Debt Manager</h1>
              <p className="text-muted-foreground md:text-xl">
                We're on a mission to help you take control of your finances.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Story</h2>
                <p className="text-muted-foreground">
                  Debt Manager was founded in 2023 with a simple goal: to create a tool that helps people track and
                  manage their personal debts effectively. We understand the challenges of keeping track of who owes you
                  money, when payments are due, and maintaining a clear overview of your financial situation.
                </p>
                <p className="text-muted-foreground">
                  Our team of financial experts and software developers worked together to create a solution that is
                  both powerful and easy to use. We believe that everyone should have access to tools that help them
                  manage their finances, regardless of their technical expertise.
                </p>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground">
                  Our mission is to empower individuals to take control of their financial lives by providing them with
                  the tools they need to track, manage, and recover debts efficiently.
                </p>
                <p className="text-muted-foreground">
                  We believe in transparency, simplicity, and effectiveness. Our platform is designed to be intuitive
                  and user-friendly, while still providing powerful features that help you stay on top of your finances.
                </p>
                <p className="text-muted-foreground">
                  Whether you're lending money to friends and family, or managing business debts, Debt Manager is here
                  to help you keep track of it all in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-muted py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter">Our Values</h2>
              <p className="text-muted-foreground md:text-xl">
                The principles that guide everything we do at Debt Manager.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold">Simplicity</h3>
                <p className="text-center text-muted-foreground">
                  We believe in keeping things simple and straightforward. Our platform is designed to be intuitive and
                  easy to use.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold">Transparency</h3>
                <p className="text-center text-muted-foreground">
                  We are committed to being transparent in everything we do, from our pricing to our data practices.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <h3 className="text-xl font-bold">Empowerment</h3>
                <p className="text-center text-muted-foreground">
                  We aim to empower our users by giving them the tools they need to take control of their financial
                  lives.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
