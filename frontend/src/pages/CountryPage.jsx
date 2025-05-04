import { useParams } from "react-router-dom";
import CountryDetails from "../components/CountryDetails";
import Header from "../components/Header";

export default function CountryPage() {
  const { code } = useParams();
  return (
    <>
     <Header />
     <div className="container mx-auto mt-8">
      <CountryDetails countryCode={code} />
    </div>
    </>
    
  );
}
