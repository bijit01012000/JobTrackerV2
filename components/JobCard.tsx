
import { JobType } from "@/utils/types";
import { useState } from "react";
import {
  MapPin,
  Briefcase,
  CalendarDays,
  RadioTower,
  Bell,
  BellRing,
} from "lucide-react";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import JobInfo from "./JobInfo";
import DeleteJobButton from "./DeleteJobButton";

function JobCard({ job }: { job: JobType }) {
  const [reminderClicked, setReminderClicked] = useState(false);
  const sendReminder = () =>{
    setReminderClicked(true);
    console.log(`reminder sent to ${job.email}`);
  }
  const date = new Date(job.createdAt).toLocaleDateString();
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 grid grid-cols-2 gap-4">
        <JobInfo icon={<Briefcase />} text={job.mode} />
        <JobInfo icon={<MapPin />} text={job.location} />
        <JobInfo icon={<CalendarDays />} text={date} />

        <Badge className="w-32  justify-center">
          <JobInfo
            icon={<RadioTower className="w-4 h-4" />}
            text={job.status}
          />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        {job.status == "pending" || job.status == "interview" ? (
          <Button size="sm" variant="destructive" className={`w-10 ${reminderClicked ? 'bg-red-700' : 'bg-slate-600'}`} onClick={sendReminder}>
            {reminderClicked ? <BellRing/> : <Bell />}
          </Button>
        ) : (
          ""
        )}
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>edit</Link>
        </Button>

        <DeleteJobButton id={job.id} />
      </CardFooter>
    </Card>
  );
}
export default JobCard;
