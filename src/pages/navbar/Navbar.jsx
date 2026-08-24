import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { SlCallOut } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth/authStore.jsx";
import { toast } from "react-toastify";
import { IoIosLogOut } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useMenuStore } from "../../store/menu/menuStore";

const headerLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/aboutUs" },
];

const projectItems = [
  {
    label: "Land Project",
    submenu: [
      {
        label: "Green City",
        to: "/greenCity",
      },
      {
        label: "Square City",
        to: "/squareCity",
      },
      {
        label: "Industrial City",
        to: "/industrialCity",
      },
    ],
  },
  {
    label: "Apartment Project",
    to: "/projects",
  },
  {
    label: "Commercial Project",
    to: "/commercial-project",
  },
  {
    label: "Duplex Project",
    to: "/NorthSouthDuplexHome",
  },
  {
    label: "Condominium Project",
    to: "/purbachalNirapadValley",
  },
  {
    label: "Hotel Project",
    href: "https://www.titanicbay.com/",
    external: true,
  },
];

const fallbackConcernItems = [
  {
    label: "North South Consortium L.T.D",
    to: "/northSouthConsortiumLtd",
  },
  {
    label: "Northsouth Green City L.T.D",
    to: "/greenCity",
  },
  {
    label: "Northsouth Industrial City",
    to: "/industrialCity",
  },
  {
    label: "Northsouth Square City",
    to: "/squareCity",
  },
  {
    label: "Nirapad Valley Condominium Project",
    to: "/purbachalNirapadValley",
  },
  {
    label: "Northsouth Duplex Home",
    to: "/conceptDetails",
  },
  {
    label: "Northsouth Farms L.T.D",
    to: "/northsouthFarmsLtd",
  },
  {
    label: "Northsouth Garments",
    to: "/northsouthGarments",
  },
  {
    label: "Daily Adin Press Media L.T.D",
    href: "https://www.dailyadin.com/",
    external: true,
  },
  {
    label: "Titanic Bay Hotel & Resort L.T.D",
    href: "https://www.titanicbay.com/",
    external: true,
  },
];

const normalizeConcernLabel = (label = "") => {
  const key = label.trim().toLowerCase();

  if (key === "purbachal nirapad valley") {
    return "Nirapad Valley Condominium Project";
  }

  if (key === "dailyadin" || key === "daily adin") {
    return "Daily Adin Press Media L.T.D";
  }

  return label.replace(/\bltd\b/gi, "L.T.D");
};

const buildConcernItems = (menuItems = []) => {
  const items = [];
  const seen = new Set();

  const addItem = (item) => {
    const normalizedItem = {
      ...item,
      label: normalizeConcernLabel(item.label),
    };

    const labelKey = normalizedItem.label?.trim().toLowerCase();
    const routeKey = item.to?.trim().toLowerCase();
    const hrefKey = item.href?.trim().toLowerCase();

    if (
      !labelKey ||
      (!routeKey && !hrefKey) ||
      seen.has(labelKey) ||
      seen.has(routeKey) ||
      seen.has(hrefKey)
    ) {
      return;
    }

    seen.add(labelKey);

    if (routeKey) {
      seen.add(routeKey);
    }

    if (hrefKey) {
      seen.add(hrefKey);
    }

    items.push(normalizedItem);
  };

  if (Array.isArray(menuItems) && menuItems.length) {
    menuItems
      .filter((item) => item?.isVisible !== false)
      .map((item) => ({
        label: item.label,
        to: item.to,
        href: item.href,
        external: item.external,
      }))
      .forEach(addItem);
  }

  if (!Array.isArray(menuItems) || !menuItems.length) {
    fallbackConcernItems.forEach(addItem);
  }

  return items;
};

function Navbar() {
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const [openProjectSub, setOpenProjectSub] = useState(false);
  const [openLandSub, setOpenLandSub] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, logoutUser, isLoggedIn } = useAuthStore();

  const {
    concernMenuItems,
    loadConcernMenuItems,
  } = useMenuStore();

  const profilePicUrl = user?.profilePic?.url;

  // Open / close mobile side menu
  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  // Close mobile menu
  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Load concern menu
  useEffect(() => {
    if (!concernMenuItems?.length) {
      loadConcernMenuItems();
    }
  }, [
    concernMenuItems?.length,
    loadConcernMenuItems,
  ]);

  // Logout
  const logOut = async () => {
    try {
      const responseMessage = await logoutUser();

      toast.success(
        responseMessage.message || "Logout Successful!"
      );
    } catch (error) {
      toast.error(error || "Logout failed");
    }
  };

  const concernItems = buildConcernItems(
    concernMenuItems
  );

  const navLinks = [
    {
      label: "Real Estate",
      to: "/realEstate",
    },
    {
      label: "Land Wanted",
      to: "/landWanted",
    },
    {
      label: "Gallery",
      to: "/gallery",
    },
    {
      label: "News & Event",
      to: "/newsEvent",
    },
    {
      label: "About Us",
      to: "/aboutUs",
    },
    {
      label: "Career",
      to: "/career",
    },
  ];

  return (
    <>
      {/* =====================================================
          TOP ACCENT LINE
      ====================================================== */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-linear-to-r from-green-500 via-green-400 to-transparent z-50" />

      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <nav
        className={`fixed w-full top-[2px] left-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-white/98 backdrop-blur-2xl shadow-[0_1px_24px_0_rgba(0,0,0,0.07)] border-b border-gray-100/80"
            : "bg-black/20 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-16 md:h-[72px]">

          {/* =================================================
              LOGO
          ================================================== */}
          <Link
            to="/"
            className="shrink-0"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-9 md:h-10 w-auto transition-all duration-500"
            />
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}
          <div className="hidden lg:flex items-center gap-2">

            {/* Header links */}
            {headerLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-2 text-sm font-semibold transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-700 hover:text-green-700"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}

            {/* =================================================
                PROJECT MENU
            ================================================== */}
            <div className="group relative">

              {/* Project button */}
              <button
                type="button"
                className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-700 hover:text-green-700"
                    : "text-white/90 hover:text-white"
                }`}
              >
                Project

                <MdKeyboardArrowDown
                  size={16}
                />
              </button>

              {/* =================================================
                  PROJECT DROPDOWN

                  pt-2 creates invisible hover area so that
                  dropdown doesn't disappear while moving mouse.
              ================================================== */}
              <div
                className="
                  absolute
                  left-0
                  top-full
                  min-w-[15rem]
                  pt-2
                  opacity-0
                  invisible
                  translate-y-2
                  transition-all
                  duration-200
                  group-hover:opacity-100
                  group-hover:visible
                  group-hover:translate-y-0
                  z-50
                "
              >
                <div
                  className="
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    p-2
                    shadow-[0_28px_70px_-35px_rgba(15,23,42,0.45)]
                  "
                >

                  {projectItems.map((item) => (

                    <div
                      key={item.label}
                      className="relative group/land"
                    >

                      {/* =================================================
                          LAND PROJECT
                      ================================================== */}
                      {item.submenu ? (
                        <>
                          <div
                            className="
                              flex
                              items-center
                              justify-between
                              rounded-xl
                              px-4
                              py-2.5
                              text-sm
                              font-semibold
                              text-gray-600
                              cursor-pointer
                              transition
                              hover:bg-green-50
                              hover:text-green-700
                            "
                          >
                            <span>
                              {item.label}
                            </span>

                            <MdKeyboardArrowDown
                              size={16}
                              className="-rotate-90"
                            />
                          </div>

                          {/* =================================================
                              LAND SUBMENU

                              No margin gap here.
                              This keeps submenu connected to parent.
                          ================================================== */}
                          <div
                            className="
                              absolute
                              left-full
                              top-0
                              min-w-[13rem]
                              opacity-0
                              invisible
                              translate-x-2
                              transition-all
                              duration-200
                              group-hover/land:opacity-100
                              group-hover/land:visible
                              group-hover/land:translate-x-0
                              z-50
                            "
                          >
                            <div
                              className="
                                rounded-2xl
                                border
                                border-gray-100
                                bg-white
                                p-2
                                shadow-[0_20px_50px_-25px_rgba(15,23,42,0.4)]
                              "
                            >

                              {item.submenu.map(
                                (subItem) => (
                                  <Link
                                    key={subItem.label}
                                    to={subItem.to}
                                    className="
                                      block
                                      rounded-xl
                                      px-4
                                      py-2.5
                                      text-sm
                                      font-semibold
                                      text-gray-600
                                      transition
                                      hover:bg-green-50
                                      hover:text-green-700
                                    "
                                  >
                                    {subItem.label}
                                  </Link>
                                )
                              )}

                            </div>
                          </div>
                        </>
                      ) : item.external ||
                        item.href?.startsWith(
                          "http"
                        ) ? (

                        /* =================================================
                            EXTERNAL PROJECT
                        ================================================== */
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            block
                            rounded-xl
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-gray-600
                            transition
                            hover:bg-green-50
                            hover:text-green-700
                          "
                        >
                          {item.label}
                        </a>

                      ) : (

                        /* =================================================
                            NORMAL PROJECT
                        ================================================== */
                        <Link
                          to={item.to}
                          className="
                            block
                            rounded-xl
                            px-4
                            py-2.5
                            text-sm
                            font-semibold
                            text-gray-600
                            transition
                            hover:bg-green-50
                            hover:text-green-700
                          "
                        >
                          {item.label}
                        </Link>
                      )}

                    </div>
                  ))}

                </div>
              </div>
            </div>

            {/* Gallery */}
            <Link
              to="/gallery"
              className={`px-3 py-2 text-sm font-semibold transition-colors duration-300 ${
                scrolled
                  ? "text-gray-700 hover:text-green-700"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Gallery
            </Link>

            {/* News & Event */}
            <Link
              to="/newsEvent"
              className={`px-3 py-2 text-sm font-semibold transition-colors duration-300 ${
                scrolled
                  ? "text-gray-700 hover:text-green-700"
                  : "text-white/90 hover:text-white"
              }`}
            >
              News & Event
            </Link>

          </div>

          {/* =================================================
              RIGHT CONTROLS
          ================================================== */}
          <div className="flex items-center gap-4 md:gap-6">

            {/* Phone */}
            <a
              href="tel:+8801894801923"
              className={`hidden md:flex items-center gap-2.5 text-[13px] font-medium transition-all duration-300 px-4 py-2 rounded-full ${
                scrolled
                  ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-100"
                  : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
              }`}
            >
              <SlCallOut size={13} />

              +880-1894-801-923
            </a>

            {/* Admin avatar */}
            {isLoggedIn && (
              <Link to="/adminDashboard">
                <img
                  src={profilePicUrl}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-green-400 shadow-md"
                />
              </Link>
            )}

            {/* Menu button */}
            <button
              onClick={toggleMenu}
              aria-label="Open Menu"
              className={`flex items-center gap-2.5 pl-3 pr-4 py-2 rounded-full border transition-all duration-300 group ${
                scrolled
                  ? "border-gray-200 text-gray-700 hover:border-green-400 hover:text-green-700"
                  : "border-white/25 text-white hover:border-white/60"
              }`}
            >

              <div className="flex flex-col gap-[4px]">

                <span
                  className={`block h-[1.5px] w-5 transition-all duration-300 ${
                    scrolled
                      ? "bg-gray-700 group-hover:bg-green-600"
                      : "bg-white"
                  }`}
                />

                <span
                  className={`block h-[1.5px] w-3 transition-all duration-300 group-hover:w-5 ${
                    scrolled
                      ? "bg-gray-700 group-hover:bg-green-600"
                      : "bg-white"
                  }`}
                />

                <span
                  className={`block h-[1.5px] w-5 transition-all duration-300 ${
                    scrolled
                      ? "bg-gray-700 group-hover:bg-green-600"
                      : "bg-white"
                  }`}
                />

              </div>

              <span
                className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-600 group-hover:text-green-700"
                    : "text-white/80"
                }`}
              >
                Menu
              </span>

            </button>

          </div>
        </div>
      </nav>

      {/* =====================================================
          BACKDROP
      ====================================================== */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40 transition-opacity duration-400 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* =====================================================
          MOBILE SLIDE PANEL
      ====================================================== */}
      <aside
        className={`fixed top-0 right-0 h-full w-[300px] md:w-[340px] bg-white z-50 flex flex-col shadow-2xl transform transition-transform duration-500 ease-in-out ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Green left accent */}
        <div className="absolute left-0 top-0 w-[3px] h-full bg-linear-to-b from-green-400 via-green-500 to-green-300" />

        {/* =================================================
            PANEL HEADER
        ================================================== */}
        <div className="flex items-center justify-between pl-8 pr-6 py-5 border-b border-gray-100">

          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-8 w-auto"
            />
          </Link>

          <button
            onClick={closeMenu}
            aria-label="Close Menu"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-400 transition-all duration-200"
          >
            <IoCloseOutline size={17} />
          </button>

        </div>

        {/* =================================================
            MOBILE NAV ITEMS
        ================================================== */}
        <ul className="flex-1 overflow-y-auto scrollbar-hide py-2">

          {/* =================================================
              LOGIN / LOGOUT
          ================================================== */}
          {isLoggedIn ? (
            <li>
              <button
                onClick={() => {
                  logOut();
                  closeMenu();
                }}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  pl-8
                  pr-6
                  py-3.5
                  text-gray-400
                  hover:text-green-600
                  hover:bg-green-50/60
                  transition-all
                  duration-200
                  text-sm
                  font-medium
                  group
                "
              >
                <span className="w-3 h-px bg-gray-200 group-hover:bg-green-400 group-hover:w-5 transition-all duration-300 shrink-0" />

                Logout

                <IoIosLogOut
                  size={14}
                  className="ml-auto text-gray-300 group-hover:text-green-500 shrink-0"
                />
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={closeMenu}
                className="
                  flex
                  items-center
                  gap-3
                  pl-8
                  pr-6
                  py-3.5
                  text-gray-400
                  hover:text-green-600
                  hover:bg-green-50/60
                  transition-all
                  duration-200
                  text-sm
                  font-medium
                  group
                "
              >
                <span className="w-3 h-px bg-gray-200 group-hover:bg-green-400 group-hover:w-5 transition-all duration-300 shrink-0" />

                Login
              </Link>
            </li>
          )}

          {/* =================================================
              HOME
          ================================================== */}
          <li>
            <Link
              to="/"
              onClick={closeMenu}
              className="
                flex
                items-center
                gap-3
                pl-8
                pr-6
                py-3.5
                text-gray-500
                hover:text-green-600
                hover:bg-green-50/60
                transition-all
                duration-200
                text-sm
                font-medium
                group
              "
            >
              <span className="w-3 h-px bg-gray-200 group-hover:bg-green-400 group-hover:w-5 transition-all duration-300 shrink-0" />

              Home
            </Link>
          </li>

          {/* =================================================
              OUR CONCERN
          ================================================== */}
          <li>

            <button
              onClick={() =>
                setOpenSub((prev) => !prev)
              }
              className="
                w-full
                flex
                items-center
                gap-3
                pl-8
                pr-6
                py-3.5
                text-gray-500
                hover:text-green-600
                hover:bg-green-50/60
                transition-all
                duration-200
                text-sm
                font-medium
                group
              "
            >

              <span className="w-3 h-px bg-gray-200 group-hover:bg-green-400 group-hover:w-5 transition-all duration-300 shrink-0" />

              Our Concern

              <MdKeyboardArrowDown
                size={16}
                className={`ml-auto text-gray-300 transition-transform duration-300 shrink-0 ${
                  openSub
                    ? "rotate-180 text-green-500"
                    : ""
                }`}
              />

            </button>

            <ul
              className={`overflow-hidden transition-all duration-300 bg-gray-50/50 ${
                openSub
                  ? "max-h-[80vh] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >

              {concernItems.map(
                ({
                  label,
                  to,
                  href,
                  external,
                }) => {

                  const itemClass =
                    "flex items-center gap-2.5 pl-16 pr-6 py-2.5 text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all duration-200 text-xs font-medium tracking-wide";

                  const content = (
                    <>
                      <span className="w-1 h-1 rounded-full bg-green-300 shrink-0" />

                      {label}
                    </>
                  );

                  return (
                    <li
                      key={
                        href ||
                        to ||
                        label
                      }
                    >

                      {external ||
                      href?.startsWith(
                        "http"
                      ) ? (

                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={closeMenu}
                          className={itemClass}
                        >
                          {content}
                        </a>

                      ) : (

                        <Link
                          to={to}
                          onClick={closeMenu}
                          className={itemClass}
                        >
                          {content}
                        </Link>

                      )}

                    </li>
                  );
                }
              )}

            </ul>
          </li>

          {/* =================================================
              PROJECT ACCORDION
          ================================================== */}
          <li>

            <button
              onClick={() =>
                setOpenProjectSub(
                  (prev) => !prev
                )
              }
              className="
                w-full
                flex
                items-center
                gap-3
                pl-8
                pr-6
                py-3.5
                text-gray-500
                hover:text-green-600
                hover:bg-green-50/60
                transition-all
                duration-200
                text-sm
                font-medium
                group
              "
            >

              <span className="w-3 h-px bg-gray-200 group-hover:bg-green-400 group-hover:w-5 transition-all duration-300 shrink-0" />

              Project

              <MdKeyboardArrowDown
                size={16}
                className={`ml-auto text-gray-300 transition-transform duration-300 shrink-0 ${
                  openProjectSub
                    ? "rotate-180 text-green-500"
                    : ""
                }`}
              />

            </button>

            {/* Project mobile submenu */}
            <ul
              className={`overflow-hidden transition-all duration-300 bg-gray-50/50 ${
                openProjectSub
                  ? "max-h-[80vh] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >

              {projectItems.map(
                (item) => (

                  <li
                    key={item.label}
                  >

                    {/* =================================================
                        LAND PROJECT MOBILE
                    ================================================== */}
                    {item.submenu ? (

                      <>
                        <button
                          onClick={() =>
                            setOpenLandSub(
                              (prev) =>
                                !prev
                            )
                          }
                          className="
                            w-full
                            flex
                            items-center
                            gap-2.5
                            pl-16
                            pr-6
                            py-2.5
                            text-gray-400
                            hover:text-green-600
                            hover:bg-green-50
                            transition-all
                            duration-200
                            text-xs
                            font-medium
                            tracking-wide
                          "
                        >

                          <span className="w-1 h-1 rounded-full bg-green-300 shrink-0" />

                          {item.label}

                          <MdKeyboardArrowDown
                            size={15}
                            className={`ml-auto transition-transform duration-300 ${
                              openLandSub
                                ? "rotate-180 text-green-500"
                                : "text-gray-300"
                            }`}
                          />

                        </button>

                        {/* Land mobile submenu */}
                        <ul
                          className={`overflow-hidden transition-all duration-300 bg-white ${
                            openLandSub
                              ? "max-h-60 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >

                          {item.submenu.map(
                            (subItem) => (
                              <li
                                key={
                                  subItem.label
                                }
                              >

                                <Link
                                  to={
                                    subItem.to
                                  }
                                  onClick={
                                    closeMenu
                                  }
                                  className="
                                    flex
                                    items-center
                                    gap-2.5
                                    pl-24
                                    pr-6
                                    py-2.5
                                    text-gray-400
                                    hover:text-green-600
                                    hover:bg-green-50
                                    transition-all
                                    duration-200
                                    text-xs
                                    font-medium
                                    tracking-wide
                                  "
                                >

                                  <span className="w-1 h-1 rounded-full bg-green-200 shrink-0" />

                                  {
                                    subItem.label
                                  }

                                </Link>

                              </li>
                            )
                          )}

                        </ul>
                      </>

                    ) : item.external ||
                      item.href?.startsWith(
                        "http"
                      ) ? (

                      /* =================================================
                          EXTERNAL MOBILE PROJECT
                      ================================================== */
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="
                          flex
                          items-center
                          gap-2.5
                          pl-16
                          pr-6
                          py-2.5
                          text-gray-400
                          hover:text-green-600
                          hover:bg-green-50
                          transition-all
                          duration-200
                          text-xs
                          font-medium
                          tracking-wide
                        "
                      >

                        <span className="w-1 h-1 rounded-full bg-green-300 shrink-0" />

                        {item.label}

                      </a>

                    ) : (

                      /* =================================================
                          NORMAL MOBILE PROJECT
                      ================================================== */
                      <Link
                        to={item.to}
                        onClick={closeMenu}
                        className="
                          flex
                          items-center
                          gap-2.5
                          pl-16
                          pr-6
                          py-2.5
                          text-gray-400
                          hover:text-green-600
                          hover:bg-green-50
                          transition-all
                          duration-200
                          text-xs
                          font-medium
                          tracking-wide
                        "
                      >

                        <span className="w-1 h-1 rounded-full bg-green-300 shrink-0" />

                        {item.label}

                      </Link>

                    )}

                  </li>
                )
              )}

            </ul>
          </li>

          {/* =================================================
              REGULAR LINKS
          ================================================== */}
          {navLinks.map(
            ({ label, to }) => (
              <li key={to}>

                <Link
                  to={to}
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    gap-3
                    pl-8
                    pr-6
                    py-3.5
                    text-gray-500
                    hover:text-green-600
                    hover:bg-green-50/60
                    transition-all
                    duration-200
                    text-sm
                    font-medium
                    group
                  "
                >

                  <span className="w-3 h-px bg-gray-200 group-hover:bg-green-400 group-hover:w-5 transition-all duration-300 shrink-0" />

                  {label}

                </Link>

              </li>
            )
          )}

          {/* =================================================
              PRIVACY POLICY
          ================================================== */}
          <li>

            <Link
              to="/privacyPolicy"
              onClick={closeMenu}
              className="
                flex
                items-center
                gap-3
                pl-8
                pr-6
                py-3.5
                text-gray-500
                hover:text-green-600
                hover:bg-green-50/60
                transition-all
                duration-200
                text-sm
                font-medium
                group
              "
            >

              <span className="w-3 h-px bg-gray-200 group-hover:bg-green-400 group-hover:w-5 transition-all duration-300 shrink-0" />

              Privacy Policy

            </Link>

          </li>

        </ul>

        {/* =================================================
            PANEL FOOTER
        ================================================== */}
        <div className="pl-8 pr-6 py-5 border-t border-gray-100 bg-gray-50/60">

          <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-semibold mb-3">
            Get In Touch
          </p>

          <a
            href="tel:+8801894801923"
            className="
              flex
              items-center
              gap-3
              text-gray-600
              hover:text-green-600
              transition-colors
              duration-200
              text-sm
              font-medium
              group
            "
          >

            <span
              className="
                w-8
                h-8
                rounded-full
                bg-green-100
                border
                border-green-200
                flex
                items-center
                justify-center
                text-green-600
                text-xs
                shrink-0
                group-hover:bg-green-500
                group-hover:text-white
                transition-all
                duration-300
              "
            >
              <SlCallOut />
            </span>

            +880-1894-801-923

          </a>

          <p className="text-gray-300 text-[10px] mt-4 tracking-wide">
            © 2025 North South Group
          </p>

        </div>

      </aside>
    </>
  );
}

export default Navbar;