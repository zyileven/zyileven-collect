"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile"
import { HTMLFileMap } from "@/app/docs/html/layout"
import { JSFileMap } from "@/app/docs/js/layout"
import { CSSFileMap } from "@/app/docs/css/layout"
import { DesignFileMap } from "@/app/docs/design-pattern/layout"
import { ReactFileMap } from "@/app/docs/react/layout"
import { NextFileMap } from "@/app/docs/nextjs/layout"
import { TSFileMap } from "@/app/docs/typescript/layout"
import { EngineerFileMap } from "@/app/docs/engineer/layout"
import { NodeFileMap } from "@/app/docs/nodejs/layout"
import { HTTPFileMap } from "@/app/docs/http/layout"


export default function Navbar() {

  const isMobileEnd = useIsMobile();

  return isMobileEnd ? <MobileNavBars /> : <PCNavbar />
}

function PCNavbar() {

  return (
    <div className="w-full border-b-1 h-[60px] mx-0 shadow-md flex justify-around items-center gap-10">
      <Link href={"/"}><Zap className="mx-5 cursor-pointer" /></Link>
      <NavigationMenu className="mx-auto" viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {/* <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <Link
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium">
                        shadcn/ui
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        Beautifully designed components built with Tailwind CSS.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li> */}
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>笔记文档</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem title={"HTML"} href={"/docs/html"} >
                  {"HTML笔记"}
                </ListItem>
                <ListItem title={"Javascript"} href={"/docs/js"} >
                  {"Javascript笔记"}
                </ListItem>
                <ListItem title={"CSS"} href={"/docs/css"} >
                  {"CSS样式笔记"}
                </ListItem>
                <ListItem title={"Design Pattern"} href={"/docs/design-pattern"} >
                  {"设计模式笔记"}
                </ListItem>
                <ListItem title={"React"} href={"/docs/react"} >
                  {"React框架笔记"}
                </ListItem>
                <ListItem title={"Next.js"} href={"/docs/nextjs"} >
                  {"Next.js框架笔记"}
                </ListItem>
                <ListItem title={"TypeScript"} href={"/docs/typescript"} >
                  {"TypeScript笔记"}
                </ListItem>
                <ListItem title={"Engineer"} href={"/docs/engineer"} >
                  {"工程化笔记"}
                </ListItem>
                <ListItem title={"Node"} href={"/docs/nodejs"} >
                  {"Node.js笔记"}
                </ListItem>
                <ListItem title={"HTTP"} href={"/docs/http"} >
                  {"HTTP 网络协议笔记"}
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/features">功能实现</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>List</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Components</div>
                      <div className="text-muted-foreground">
                        Browse all components in the library.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Documentation</div>
                      <div className="text-muted-foreground">
                        Learn how to use the library.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">
                      <div className="font-medium">Blog</div>
                      <div className="text-muted-foreground">
                        Read our latest blog posts.
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#">Components</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Documentation</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#">Blocks</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="#" className="flex-row items-center gap-2">
                      <CircleHelpIcon />
                      Backlog
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#" className="flex-row items-center gap-2">
                      <CircleIcon />
                      To Do
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="#" className="flex-row items-center gap-2">
                      <CircleCheckIcon />
                      Done
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

function MobileNavBars() {
  return (
    <div className="w-full border-b-1 h-[60px] mx-0 shadow-md flex justify-between items-center gap-10">
      <Link href={"/"}><Zap className="mx-5 cursor-pointer" /></Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer pr-[2rem]">
            <Menu />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuItem>Home</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>笔记文档</DropdownMenuLabel>
          <DropdownMenuGroup>
            {/* HTML */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Link title={"HTML"} href={"/docs/html"} >
                  {"HTML笔记"}
                </Link>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {
                    Object.keys(HTMLFileMap).map(key => {
                      return <DropdownMenuItem key={key}>
                        <Link title={"HTML"} href={`/docs/html/${key}`} >
                          {HTMLFileMap[key]}
                        </Link>
                      </DropdownMenuItem>
                    })
                  }
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/* Javascript */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Link title={"Javascript"} href={"/docs/js"} >
                  {"Javascript笔记"}
                </Link>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {
                    Object.keys(JSFileMap).map(key => {
                      return <DropdownMenuItem key={key}>
                        <Link title={"Javascript"} href={`/docs/js/${key}`} >
                          {JSFileMap[key]}
                        </Link>
                      </DropdownMenuItem>
                    })
                  }
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/* CSS */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Link title={"CSS"} href={"/docs/css"} >
                  {"CSS样式笔记"}
                </Link>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {
                    Object.keys(CSSFileMap).map(key => {
                      return <DropdownMenuItem key={key}>
                        <Link title={"CSS"} href={`/docs/css/${key}`} >
                          {CSSFileMap[key]}
                        </Link>
                      </DropdownMenuItem>
                    })
                  }
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/* Design */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Link title={"Design Pattern"} href={"/docs/design-pattern"} >
                  {"设计模式笔记"}
                </Link>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {
                    Object.keys(DesignFileMap).map(key => {
                      return <DropdownMenuItem key={key}>
                        <Link title={"Design Pattern"} href={`/docs/design-pattern/${key}`} >
                          {DesignFileMap[key]}
                        </Link>
                      </DropdownMenuItem>
                    })
                  }
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/* React.js */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Link title={"React.js"} href={"/docs/react"} >
                  {"React框架笔记"}
                </Link>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {
                    Object.keys(ReactFileMap).map(key => {
                      return <DropdownMenuItem key={key}>
                        <Link title={"React.js"} href={`/docs/react/${key}`} >
                          {ReactFileMap[key]}
                        </Link>
                      </DropdownMenuItem>
                    })
                  }
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/* Next.js */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Link title={"Next.js"} href={"/docs/nextjs"} >
                  {"Next.js框架笔记"}
                </Link>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {
                    Object.keys(NextFileMap).map(key => {
                      return <DropdownMenuItem key={key}>
                        <Link title={"Next.js"} href={`/docs/nextjs/${key}`} >
                          {NextFileMap[key]}
                        </Link>
                      </DropdownMenuItem>
                    })
                  }
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/* TypeScript */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Link title={"TypeScript"} href={"/docs/typescript"} >
                  {"TypeScript笔记"}
                </Link>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {
                    Object.keys(TSFileMap).map(key => {
                      return <DropdownMenuItem key={key}>
                        <Link title={"TypeScript"} href={`/docs/typescript/${key}`} >
                          {TSFileMap[key]}
                        </Link>
                      </DropdownMenuItem>
                    })
                  }
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/* Engineer */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Link title={"Engineer"} href={"/docs/engineer"} >
                  {"工程化笔记"}
                </Link>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {
                    Object.keys(EngineerFileMap).map(key => {
                      return <DropdownMenuItem key={key}>
                        <Link title={"Engineer"} href={`/docs/engineer/${key}`} >
                          {EngineerFileMap[key]}
                        </Link>
                      </DropdownMenuItem>
                    })
                  }
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/* Node.js */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Link title={"Node.js"} href={"/docs/nodejs"} >
                  {"Node.js笔记"}
                </Link>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {
                    Object.keys(NodeFileMap).map(key => {
                      return <DropdownMenuItem key={key}>
                        <Link title={"Node.js"} href={`/docs/nodejs/${key}`} >
                          {NodeFileMap[key]}
                        </Link>
                      </DropdownMenuItem>
                    })
                  }
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            {/* HTTP */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Link title={"HTTP"} href={"/docs/http"} >
                  {"HTTP 网络协议笔记"}
                </Link>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {
                    Object.keys(HTTPFileMap).map(key => {
                      return <DropdownMenuItem key={key}>
                        <Link title={"HTTP"} href={`/docs/http/${key}`} >
                          {HTTPFileMap[key]}
                        </Link>
                      </DropdownMenuItem>
                    })
                  }
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

  )
}