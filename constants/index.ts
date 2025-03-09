export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "Users",
  },
  {
    img: "/icons/admin/building-2.svg",
    route: "/admin/companies",
    text: "Companies",
  },
  {
    img: "/icons/admin/camera.svg",
    route: "/admin/gears",
    text: "Gears",
  },
  {
    img: "/icons/admin/book.svg",
    route: "/admin/books",
    text: "Books",
  },
]

export const FIELD_NAMES = {
  fullname: "Full name",
  email: "Email",
  password: "Password",
}

export const FIELD_TYPES = {
  fullname: "text",
  email: "email",
  password: "password",
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
