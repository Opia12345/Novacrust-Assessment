import NavTabs from "../components/NavTabs";
import PaymentForm from "../components/PaymentForm";

const page = () => {
  return (
    <>
      <section className="flex justify-center flex-col items-center h-screen">
        <NavTabs />
        <PaymentForm />
      </section>
    </>
  );
};

export default page;
