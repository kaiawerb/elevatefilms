export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Início",
  },
  {
    img: "/icons/admin/trees.svg",
    route: "/admin/properties",
    text: "Imóveis",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "Usuários",
  },
  {
    img: "/icons/admin/building-2.svg",
    route: "/admin/companies",
    text: "Empresas",
  },
  {
    img: "/icons/admin/camera.svg",
    route: "/admin/gears",
    text: "Equipamentos",
  },
  {
    img: "/icons/admin/map-pin-house.svg",
    route: "/admin/map",
    text: "Mapa",
  },
]

export const FIELD_NAMES = {
  fullname: "Full name",
  email: "Email",
  password: "Password",
  companyId: "Company ID",
}

export const FIELD_TYPES = {
  fullname: "text",
  email: "email",
  password: "password",
  companyId: "companyId",
}

export const sorts = [
  {
    value: "oldest",
    label: "Oldest",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "available",
    label: "Available",
  },
  {
    value: "highestRated",
    label: "Highest Rated",
  },
]

export const userRoles = [
  {
    value: "user",
    label: "User",
    bgColor: "bg-[#FDF2FA]",
    textColor: "text-[#C11574]",
  },
  {
    value: "admin",
    label: "Admin",
    bgColor: "bg-[#ECFDF3]",
    textColor: "text-[#027A48]",
  },
]
