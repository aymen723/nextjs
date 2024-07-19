"use client";
import { changePassword } from "@/client/api/authService/accountApi";
import {
  patchPharmacy,
  putPharmacyUptimes,
} from "@/client/api/stockService/pharmacyApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useGetPharmacy from "@/util/hooks/api/useGetPharmacy";
import useGetPharmacyUptime from "@/util/hooks/api/useGetPharmacyUptime";
import useGetUserProfile from "@/util/hooks/api/useGetUserProfile";
import { useAppSelector } from "@/util/hooks/redux";
import { weekDayFr } from "@/util/lib/dataConversion";
import { Clock3, Info, Trash, Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const days = Object.keys(weekDayFr) as (keyof typeof weekDayFr)[];

const defaultUptimes = days.map((day) => {
  return { day: day, openTime: "", closeTime: "" };
});

const PharmacyInfoPage = () => {
  const authData = useAppSelector((app) => app.auth.authData);
  const [password, setPassword] = React.useState("");
  const [passwordConf, setPasswordConf] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const { profileData } = useGetUserProfile(authData?.id ?? 0);
  const { pharmacyData } = useGetPharmacy(profileData?.pharmacy?.id ?? 0);
  const { pharmacyUptime } = useGetPharmacyUptime(
    profileData?.pharmacy?.id ?? 0
  );

  const [editUpTimes, setEditUpTimes] = React.useState(defaultUptimes);

  const [changePwd, setChangePwd] = React.useState(false);

  React.useEffect(() => {
    if (pharmacyUptime) {
      setEditUpTimes((old) =>
        old.map((uptime) => {
          const match = pharmacyUptime.uptimes?.find(
            (up) => up.day === uptime.day
          );

          if (!!match) {
            return {
              openTime: match.openTime,
              closeTime: match.closeTime,
              day: match.day,
            };
          }
          return uptime;
        })
      );
    }
  }, [pharmacyUptime]);

  React.useEffect(() => {
    if (pharmacyData) {
      setPhone(pharmacyData.phoneNumber ?? "");
      setName(pharmacyData.name);
    }
  }, [pharmacyData]);
  return (
    <div className="p-4">
      <div className=" bg-white/70  bg-no-repeat bound p-4 rounded  relative">
        <div
          className="h-64 rounded-t"
          style={{
            backgroundImage: `url(${profileData?.pharmacy?.picture})`,
            backgroundRepeat: "round",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="flex gap-2  items-center my-4">
          <Info className="size-5" />
          <h3 className="text-xl font-semibold">Information</h3>
          <div className="w-full h-[1px] bg-muted-foreground"></div>
        </div>
        <div className="py-2  md:px-4 lg:px-8">
          <div className="md:flex gap-2 px-8 py-2 justify-between">
            <div className="">
              <Label htmlFor="pharma-name">Nom</Label>
              <Input
                value={name}
                className="md:w-48  lg:w-72"
                id="pharma-name"
                placeholder="Nom"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="">
              <Label htmlFor="pharma-phone">Télephone</Label>
              <Input
                value={phone}
                className="md:w-48  lg:w-72"
                id="pharma-phone"
                placeholder="Télephone"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="px-8 py-2 ">
            <div className="flex items-center gap-2">
              <Switch
                checked={changePwd}
                onCheckedChange={(checked) => {
                  setChangePwd(checked);
                }}
              />
              <Label>changer le mot de pass?</Label>
            </div>
          </div>

          <div className="md:flex gap-2 px-8 py-2 justify-between">
            <div className="">
              <Label htmlFor="pharma-password">Mot De Pass</Label>
              <Input
                disabled={!changePwd}
                value={password}
                type="password"
                className="  md:w-48  lg:w-72"
                id="pharma-password"
                placeholder="Mot De Pass"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="">
              <Label htmlFor="pharma-confirm">Confirmer</Label>
              <Input
                type="password"
                disabled={!changePwd}
                value={passwordConf}
                onChange={(e) => {
                  setPasswordConf(e.target.value);
                }}
                className="md:w-48  lg:w-72"
                id="pharma-confirm"
                placeholder="Confirmer"
              />
            </div>
          </div>
          <div className="md:flex gap-2 px-8 py-2 justify-center mx-2">
            <div className="">
              <button
                className="px-2 py-1 bg-muted-foreground text-secondary rounded"
                onClick={() => {
                  if (
                    pharmacyData?.name !== name ||
                    pharmacyData.phoneNumber !== phone
                  )
                    patchPharmacy({
                      newPhoneNumber: phone ?? null,
                      name: name ?? null,
                    })
                      .then(() => {
                        toast.success("info changé");
                      })
                      .catch(() => {});

                  if (changePwd) {
                    if (!password) return toast.error("pas de mot de pass");
                    if (password != passwordConf)
                      return toast.error("confirmation de mot pass");
                    changePassword(password)
                      .then(() => {
                        toast.success("mot de pass changé");
                        setPassword("");
                        setPasswordConf("");
                      })
                      .catch(() => {
                        toast.error("echoer mot de pass changement");
                      });
                  }
                }}
              >
                Changer
              </button>
            </div>
            <div className=""></div>
          </div>
        </div>

        <div className="flex gap-2  items-center my-4">
          <Clock3 className="size-5" />
          <h3 className="text-xl font-semibold">Heureur</h3>
          <div className="w-full h-[1px] bg-muted-foreground"></div>
        </div>

        <div className=" flex flex-col gap-2 p-4 ">
          {editUpTimes.map((uptime) => {
            return (
              <div
                key={uptime.day}
                className="w-full bg-muted/30 p-2 rounded h-12 flex items-center "
              >
                <span className="capitalize w-20 ">
                  {weekDayFr[uptime.day]}
                </span>
                <div className="w-full flex items-center justify-center gap-4">
                  <Input
                    type="time"
                    className="w-fit"
                    value={uptime.openTime}
                    onChange={(e) =>
                      setEditUpTimes((old) =>
                        old.map((up) => {
                          if (up.day === uptime.day) {
                            return { ...up, openTime: e.target.value };
                          }
                          return up;
                        })
                      )
                    }
                  />
                  <span>a</span>
                  <Input
                    type="time"
                    className="w-fit"
                    defaultValue={uptime.closeTime}
                    onChange={(e) =>
                      setEditUpTimes((old) =>
                        old.map((up) => {
                          if (up.day === uptime.day) {
                            return { ...up, closeTime: e.target.value };
                          }
                          return up;
                        })
                      )
                    }
                  />
                </div>
                <div>
                  <Trash2 className="size-5 text-primary-red" />
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <button
            className="px-2 py-1 rounded bg-muted-foreground text-white mx-auto flex"
            onClick={() => {
              putPharmacyUptimes(pharmacyData?.id ?? 0, editUpTimes)
                .then((res) => {
                  console.log("uptimes res", res.data);
                  toast.success("heureur mis a jour");
                })
                .catch((e) => {
                  console.log("uptimes err" + e);
                });
            }}
          >
            Chager heureur
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacyInfoPage;
