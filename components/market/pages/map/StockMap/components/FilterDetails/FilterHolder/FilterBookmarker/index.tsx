import { postBookmark } from "@/client/api/stockService/bookmarkApi";
import { ProductRespData } from "@/client/types/responses/StockResponses";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Bookmark, Loader2 } from "lucide-react";
import React from "react";
type Props = {
  products: ProductRespData[];
};
const FilterBookmarker = ({ products }: Props) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
      }}
    >
      <DialogTrigger>
        <div>
          <Bookmark className="size-4 hover:text-purple-500" />
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) {
              setLoading(true);
              postBookmark({
                name: name || undefined,
                products: products.map((p) => p.id),
              })
                .catch((e) => {
                  console.log(e);
                })
                .finally(() => {
                  setName("");
                  if (open) setOpen(false);
                  setLoading(false);
                });
            }
          }}
          className="flex flex-col gap-4"
        >
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="mt-4"
            placeholder="nom"
          />
          <button
            type="submit"
            className="px-2 py-1 bg-muted rounded flex gap-2 justify-center items-center"
          >
            {loading && <Loader2 className="animate-spin size-4" />}
            <span>Confirmer</span>
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FilterBookmarker;
