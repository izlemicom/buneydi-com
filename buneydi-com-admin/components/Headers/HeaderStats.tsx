import { useSession } from "next-auth/client";
import React from "react";
import {
  arrowsColorHelper,
  arrowsHelper,
  percentageHelper,
} from "../../lib/statshelper";
import CardStats from "../Cards/CardStats";

// components

export default function HeaderStats({ total, firstWeek, lastWeek }) {
  const [session, loading] = useSession();
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="KAZANÇ"
                  statTitle={(total.viewCount * 0.1).toString()}
                  statArrow={arrowsHelper(
                    firstWeek.viewCount,
                    lastWeek.viewCount
                  )}
                  statPercent={percentageHelper(
                    firstWeek.viewCount,
                    lastWeek.viewCount
                  )}
                  statPercentColor={arrowsColorHelper(
                    firstWeek.viewCount,
                    lastWeek.viewCount
                  )}
                  statDescripiron="Geçen haftadan itibaren"
                  statIconName="fas fa-lira-sign"
                  statIconColor="bg-emerald-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="GÖRÜNTÜLENME SAYISI"
                  statTitle={total.viewCount.toString()}
                  statArrow={arrowsHelper(
                    firstWeek.viewCount,
                    lastWeek.viewCount
                  )}
                  statPercent={percentageHelper(
                    firstWeek.viewCount,
                    lastWeek.viewCount
                  )}
                  statPercentColor={arrowsColorHelper(
                    firstWeek.viewCount,
                    lastWeek.viewCount
                  )}
                  statDescripiron="Geçen haftadan itibaren"
                  statIconName="fas fa-eye"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="YORUM SAYISI"
                  statTitle={total.commentCount.toString()}
                  statArrow={arrowsHelper(
                    firstWeek.commentCount,
                    lastWeek.commentCount
                  )}
                  statPercent={percentageHelper(
                    firstWeek.commentCount,
                    lastWeek.commentCount
                  )}
                  statPercentColor={arrowsColorHelper(
                    firstWeek.commentCount,
                    lastWeek.commentCount
                  )}
                  statDescripiron="Geçen haftadan itibaren"
                  statIconName="fas fa-comment"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="BEĞENİ SAYISI"
                  statTitle={total.likeCount.toString()}
                  statArrow={arrowsHelper(
                    firstWeek.likeCount,
                    lastWeek.likeCount
                  )}
                  statPercent={percentageHelper(
                    firstWeek.likeCount,
                    lastWeek.likeCount
                  )}
                  statPercentColor={arrowsColorHelper(
                    firstWeek.likeCount,
                    lastWeek.likeCount
                  )}
                  statDescripiron="Geçen haftadan itibaren"
                  statIconName="fas fa-heart"
                  statIconColor="bg-red-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
