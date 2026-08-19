import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Cards() {
  return (
    <section className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>
              <h1>Buy a home</h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              A real estate agent can provide you with a clear breakdown of
              costs so that you can avoid surprise expenses.
            </p>{" "}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Rent a home</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We’re creating a seamless online experience – from shopping on the
              largest rental network, to applying, to paying rent.
            </p>{" "}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Sell a home</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We’re creating a seamless online experience – from shopping on the
              largest rental network, to applying, to paying rent.{" "}
            </p>{" "}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default Cards;
