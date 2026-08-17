import { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import Spinner from "./components/Spinner";
import "flowbite";
import Footer from "./pages/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { motion } from "framer-motion";
import { useAuthStore } from "./store/auth/authStore.jsx";
import ProtectedRoute from "./route/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./components/NotFound"));
const HeroPage = lazy(() => import("./pages/HeroPage"));
const ConsortiumDetails = lazy(() => import("./pages/consortium/ConsortiumDetails"));
const RealEstate = lazy(() => import("./pages/realstate/RealEstate"));
// const RealEstateProjects = lazy(() => import("./pages/realstate/RealEstateProjects"));
const LandWanted = lazy(() => import("./pages/landwanted/LandWanted"));
const BannerProject = lazy(() => import("./pages/bannerprojects/BannerProject"));
const GreenCity = lazy(() => import("./pages/bannerprojects/GreenCity"));
const SquareCity = lazy(() => import("./pages/bannerprojects/SquareCity"));
const IndustrialCity = lazy(() => import("./pages/bannerprojects/IndustrialCity"));
const AboutUs = lazy(() => import("./pages/about/AboutUs"));
const Career = lazy(() => import("./pages/career/Career"));
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const NewsEvent = lazy(() => import("./pages/newsEvent/NewsEvent"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Login = lazy(() => import("./pages/user/Login.jsx"));
const DynamicConcernPage = lazy(() => import("./pages/ourConcern/DynamicConcernPage.jsx"));
const ProjectsPage = lazy(() => import("./pages/project/ProjectsPage.jsx"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ViewDashboard = lazy(() => import("./pages/admin/ViewDashboard"));
const AdminProfile = lazy(() => import("./pages/admin/AdminProfile.jsx"));
const ViewConcerns = lazy(() => import("./pages/admin/ViewConcerns.jsx"));
const MenuSettings = lazy(() => import("./pages/admin/MenuSettings.jsx"));
const ConcernForm = lazy(() => import("./pages/admin/concerns/ConcernForm.jsx"));
const ConcernDetails = lazy(() => import("./pages/admin/concerns/ConcernDetails.jsx"));
const CreateProject = lazy(() => import("./pages/admin/projects/createProject"));
const UpdateProject = lazy(() => import("./pages/admin/projects/UpdateProject"));
const ViewProjects = lazy(() => import("./pages/admin/projects/ViewProjects.jsx"));
const ProjectDetails = lazy(() => import("./pages/admin/projects/ProjectDetails"));
const CreateNewsEvent = lazy(() => import("./pages/admin/newsEvent/CreateNewsEvent"));
const ViewNewsEvents = lazy(() => import("./pages/admin/newsEvent/ViewNewsEvents"));
const UpdateNewsEvents = lazy(() => import("./pages/admin/newsEvent/UpdateNewsEvents"));
const NewsEventDetails = lazy(() => import("./pages/admin/newsEvent/NewsEventDetails"));
const CreateGreenCity = lazy(() => import("./pages/admin/bannerProjects/CreateGreenCity"));
const CreateSquareCity = lazy(() => import("./pages/admin/bannerProjects/CreateSquareCity"));
const CreateIndustrialCity = lazy(() => import("./pages/admin/bannerProjects/CreateIndustrialCity"));
const ViewGreenCity = lazy(() => import("./pages/admin/bannerProjects/ViewGreenCity"));
const ViewSquareCity = lazy(() => import("./pages/admin/bannerProjects/ViewSquareCity"));
const ViewIndustrialCity = lazy(() => import("./pages/admin/bannerProjects/ViewIndustrialCity"));
const UpdateGreenCity = lazy(() => import("./pages/admin/bannerProjects/UpdateGreenCity"));
const UpdateSquareCity = lazy(() => import("./pages/admin/bannerProjects/UpdateSquareCity"));
const UpdateIndustrialCity = lazy(() => import("./pages/admin/bannerProjects/UpdateIndustrialCity"));
const CreateReview = lazy(() => import("./pages/admin/review/CreateReview"));
const ViewReview = lazy(() => import("./pages/admin/review/ViewReview.jsx"));
const UpdateReview = lazy(() => import("./pages/admin/review/UpdateReview.jsx"));
const ReviewDetails = lazy(() => import("./pages/admin/review/ReviewDetails.jsx"));
const CreatePartners = lazy(() => import("./pages/admin/partners/CreatePartners.jsx"));
const ViewPartners = lazy(() => import("./pages/admin/partners/ViewPartners.jsx"));
const UpdatePartners = lazy(() => import("./pages/admin/partners/UpdatePartners.jsx"));
const ViewContact = lazy(() => import("./pages/admin/contact/ViewContact.jsx"));
const UpdateContact = lazy(() => import("./pages/admin/contact/UpdateContact.jsx"));
const ContactInfoSettings = lazy(() => import("./pages/admin/contact/ContactInfoSettings.jsx"));
const ContactDetails = lazy(() => import("./pages/admin/contact/ContactDetails.jsx"));
const ViewPlotBooking = lazy(() => import("./pages/admin/plotBooking/viewPlotBooking.jsx"));
const AboutPageSettings = lazy(() => import("./pages/admin/about/AboutPageSettings.jsx"));

const ConcernRoute = () => {
  const { slug } = useParams();
  return <DynamicConcernPage slug={slug} />;
};

function App({ scaling }) {
  const location = useLocation();

  // Determine if the current route is part of admin dashboard
  const isAdminRoute = location.pathname.startsWith("/adminDashboard");
  const { isLoading } = useAuthStore();

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     clearError();
  //   }

  //   if (message) {
  //     toast.success(message);
  //     clearMessage();
  //   }
  // }, [error, message, clearError, clearMessage]);

  const [largeCircle, setLargeCircle] = useState({ x: 0, y: 0 });
  const [smallcircle, setSmallCircle] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isAdminRoute) {
      return undefined;
    }

    const mousemove = (e) => {
      setLargeCircle({ x: e.clientX, y: e.clientY });
      setSmallCircle({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mousemove);

    return () => {
      window.removeEventListener("mousemove", mousemove);
    };
  }, [isAdminRoute]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {!isAdminRoute && (
            <>
              <motion.div
                animate={{
                  x: largeCircle.x - 32,
                  y: largeCircle.y - 32,
                  transition: { type: "spring", mass: 3 },
                }}
                className="large_circle"
                style={{ scale: scaling ? 0.1 : 1 }}
              />
              <motion.div
                animate={{
                  x: smallcircle.x - 8,
                  y: smallcircle.y - 8,
                  transition: { type: "spring", mass: 2 },
                }}
                className="small_circle"
              />
            </>
          )}

          <ScrollToTop />
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<HeroPage />}>
                <Route index element={<Home />} />
                <Route
                  path="/consortiumDetails/:id"
                  element={<ConsortiumDetails />}
                />
                <Route path="/project/:id" element={<ConsortiumDetails />} />
                <Route path="/conceptDetails" element={<DynamicConcernPage slug="concept-details" />} />
                <Route path="/realEstate" element={<RealEstate />} />
                {/* <Route
                  path="/realEstateProjects"
                  element={<RealEstateProjects />}
                /> */}
                 <Route
                  path="/projects"
                  element={<ProjectsPage />}
                />
                <Route path="/landWanted" element={<LandWanted />} />
                <Route path="/bannerProject" element={<BannerProject />} />
                <Route path="/greenCity" element={<GreenCity />} />
                <Route path="/squareCity" element={<SquareCity />} />
                <Route path="/industrialCity" element={<IndustrialCity />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/career" element={<Career />} />
                <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/newsEvent" element={<NewsEvent />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route
                  path="/newsEventDetails/:id"
                  element={<NewsEventDetails />}
                />

                <Route
                  path="/northSouthConsortiumLtd"
                  element={<DynamicConcernPage slug="north-south-consortium-ltd" />}
                />
                <Route
                  path="/purbachalNirapadValley"
                  element={<DynamicConcernPage slug="purbachal-nirapad-valley" />}
                />
                <Route
                  path="/northsouthFarmsLtd"
                  element={<DynamicConcernPage slug="northsouth-farms-ltd" />}
                />
                <Route
                  path="/northsouthGarments"
                  element={<DynamicConcernPage slug="northsouth-garments" />}
                />
                <Route path="/concern/:slug" element={<ConcernRoute />} />

                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Admin Protected Route */}
              <Route
                path="/adminDashboard"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              >
                <Route path="viewDashboard" element={<ViewDashboard />} />
                <Route path="projectDetails/:id" element={<ProjectDetails />} />
                <Route path="createProject" element={<CreateProject />} />
                <Route path="updateProject/:id" element={<UpdateProject />} />
                <Route path="viewProjects" element={<ViewProjects />} />
                <Route path="createNewsEvent" element={<CreateNewsEvent />} />
                <Route path="viewNewsEvents" element={<ViewNewsEvents />} />
                <Route
                  path="updateNewsEvents/:id"
                  element={<UpdateNewsEvents />}
                />
                <Route
                  path="newsEventDetails/:id"
                  element={<NewsEventDetails />}
                />
                <Route path="createGreenCity" element={<CreateGreenCity />} />
                <Route path="createSquareCity" element={<CreateSquareCity />} />
                <Route
                  path="createIndustrialCity"
                  element={<CreateIndustrialCity />}
                />
                <Route path="viewGreenCity" element={<ViewGreenCity />} />
                <Route path="viewSquareCity" element={<ViewSquareCity />} />
                <Route
                  path="viewIndustrialCity"
                  element={<ViewIndustrialCity />}
                />
                <Route
                  path="updateGreenCity/:id"
                  element={<UpdateGreenCity />}
                />
                <Route
                  path="updateSquareCity/:id"
                  element={<UpdateSquareCity />}
                />
                <Route
                  path="updateIndustrialCity/:id"
                  element={<UpdateIndustrialCity />}
                />
                 <Route
                  path="createReview"
                  element={<CreateReview />}
                />
                 <Route
                  path="viewReview"
                  element={<ViewReview />}
                />
                <Route
                  path="updateReview/:id"
                  element={<UpdateReview />}
                />
                   <Route
                  path="reviewDetails/:id"
                  element={<ReviewDetails />}
                />
                
                 <Route
                  path="createPartners"
                  element={<CreatePartners />}
                />
                <Route
                  path="viewPartners"
                  element={<ViewPartners />}
                />
              <Route path="updatePartners/:id" element={<UpdatePartners />} />

                
                <Route
                  path="viewContact"
                  element={<ViewContact />}
                />
                <Route
                  path="contactInfoSettings"
                  element={<ContactInfoSettings />}
                />
                <Route
                  path="aboutPageSettings"
                  element={<AboutPageSettings />}
                />
                <Route
                  path="updateContact/:id"
                  element={<UpdateContact />}
                />
                   <Route
                  path="contactDetails/:id"
                  element={<ContactDetails />}
                />
                <Route
                  path="viewPlotBooking"
                  element={<ViewPlotBooking />}
                />
                <Route path="viewConcerns" element={<ViewConcerns />} />
                <Route path="menuSettings" element={<MenuSettings />} />
                <Route path="createConcern" element={<ConcernForm />} />
                <Route path="updateConcern/:id" element={<ConcernForm />} />
                <Route path="concernDetails/:id" element={<ConcernDetails />} />
                <Route
                  path="adminProfile"
                  element={<AdminProfile />}
                />
                
              </Route>
            </Routes>
          </Suspense>
          {/* Only show footer if NOT admin route */}
          {!isAdminRoute && <Footer />}
        </>
      )}
    </>
  );
}

export default App;
